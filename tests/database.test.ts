import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
test("PostgreSQL RLS, persistent rate limits, metrics and retained total", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema auth to authenticated,anon,service_role;
      grant execute on function auth.uid() to authenticated,anon,service_role;`);
    const migration = await readFile(
      "supabase/migrations/001_portfolio.sql",
      "utf8",
    );
    await db.exec(migration);
    await db.exec(migration);
    const owner = "11111111-1111-4111-8111-111111111111",
      other = "22222222-2222-4222-8222-222222222222";
    await db.query("insert into auth.users(id) values($1),($2)", [
      owner,
      other,
    ]);
    await db.query("insert into public.portfolio_admins values($1)", [owner]);
    await db.exec(
      `set role service_role; insert into public.portfolio_events(event_type,target,source,device,browser) values ('cv_download','curriculo','/','desktop','Chrome'),('visit','home','/','mobile','Safari');reset role;`,
    );
    await db.exec("set role anon");
    await assert.rejects(
      () => db.query("select * from public.portfolio_events"),
      /permission denied/,
    );
    await assert.rejects(
      () =>
        db.query("select public.portfolio_take_rate_limit('a','events',60)"),
      /permission denied/,
    );
    await db.exec(
      `reset role;set role authenticated;select set_config('request.jwt.claim.sub','${other}',false)`,
    );
    assert.equal(
      (await db.query("select * from public.portfolio_events")).rows.length,
      0,
    );
    await assert.rejects(
      () =>
        db.query(
          "select public.portfolio_metrics(current_date-1,current_date)",
        ),
      /not authorized/,
    );
    await assert.rejects(
      () =>
        db.query(
          "insert into public.portfolio_events(event_type,target,source,device,browser) values('visit','home','/','mobile','Chrome')",
        ),
      /permission denied/,
    );
    await db.exec(
      `select set_config('request.jwt.claim.sub','${owner}',false)`,
    );
    assert.equal(
      (await db.query("select * from public.portfolio_events")).rows.length,
      2,
    );
    const metrics = await db.query<{
      m: { totalDownloads: number; visits: number };
    }>("select public.portfolio_metrics(current_date-1,current_date+1) m");
    assert.equal(metrics.rows[0].m.totalDownloads, 1);
    assert.equal(metrics.rows[0].m.visits, 1);
    await db.exec("reset role;set role service_role");
    const key = "a".repeat(64);
    for (let i = 0; i < 4; i++) {
      const result = await db.query<{ ok: boolean }>(
        "select public.portfolio_take_rate_limit($1,$2,$3) ok",
        [key, "contact", 3],
      );
      assert.equal(result.rows[0].ok, i < 3);
    }
    await db.exec(
      "update public.portfolio_events set created_at=now()-interval '13 months';select public.portfolio_cleanup();reset role;set role authenticated",
    );
    assert.equal(
      (await db.query("select * from public.portfolio_events")).rows.length,
      0,
    );
    const retained = await db.query<{ m: { totalDownloads: number } }>(
      "select public.portfolio_metrics(current_date-1,current_date) m",
    );
    assert.equal(retained.rows[0].m.totalDownloads, 1);
  } finally {
    await db.close();
  }
});
