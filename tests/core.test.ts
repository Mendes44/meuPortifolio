import { test } from "node:test";
import assert from "node:assert/strict";
import { projects, filterProjects } from "../lib/projects";
import {
  validateContact,
  safePath,
  csvCell,
  authorizedAdmin,
  deviceCategory,
  browserCategory,
} from "../lib/validation";
import { dateRange } from "../lib/date-range";
test("filter by area, technology and accented search together", () => {
  assert.equal(filterProjects("Todos", "Todas", "").length, 14);
  assert.deepEqual(
    filterProjects("Backend & APIs", "Java", "gestao").map((p) => p.slug),
    ["gestao-api"],
  );
  assert.equal(filterProjects("Frontend", "Java", "").length, 0);
  assert.ok(
    filterProjects("Full Stack", "PostgreSQL", "").some(
      (p) => p.slug === "appbraza",
    ),
  );
  assert.ok(
    filterProjects("Redes & Linux", "Linux", "").some(
      (p) => p.slug === "linux-ssh",
    ),
  );
});
test("private and code-only projects have no invented links", () => {
  assert.equal(projects.find((p) => p.slug === "mesa-certa")!.repo, undefined);
  assert.equal(projects.find((p) => p.slug === "gestao-api")!.demo, undefined);
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const p of projects)
    for (const url of [p.repo, p.demo].filter(Boolean))
      assert.equal(new URL(url!).protocol, "https:");
});
test("contact rejects incomplete, oversized and injected fields", () => {
  assert.ok(
    validateContact({
      name: "Marcos",
      email: "test@example.com",
      message: "Uma mensagem válida.",
    }),
  );
  assert.equal(
    validateContact({ name: "A", email: "foo", message: "curta" }),
    null,
  );
  assert.equal(
    validateContact({
      name: "Marcos",
      email: "test@example.com\nBcc: another@example.com",
      message: "Uma mensagem válida.",
    }),
    null,
  );
  assert.equal(
    validateContact({
      name: "Marcos",
      email: "test@example.com",
      message: "a".repeat(4001),
    }),
    null,
  );
  assert.equal(validateContact(null), null);
});
test("privacy strips queries and accepts only known path shapes", () => {
  assert.equal(
    safePath("/projetos/appbraza?email=private#test"),
    "/projetos/appbraza",
  );
  assert.equal(safePath("https://malicious.example/"), "/");
  assert.equal(safePath("/admin"), "/");
  assert.equal(safePath("/?token=secret"), "/");
});
test("CSV export escapes quotes and prevents spreadsheet formulas", () => {
  assert.equal(csvCell('a"b'), '"a""b"');
  assert.equal(csvCell('=HYPERLINK("test")'), '"\'=HYPERLINK(""test"")"');
  assert.ok(csvCell("  +SUM(1)").startsWith("\"'"));
});
test("only configured exact admin identity is authorized", () => {
  assert.equal(authorizedAdmin(undefined, undefined), false);
  assert.equal(authorizedAdmin("other", "owner"), false);
  assert.equal(authorizedAdmin("owner", "owner"), true);
});
test("date range validates real dates and converts exclusive end boundary", () => {
  const r = dateRange(
    new URL("https://test/?start=2026-09-01&end=2026-09-07"),
  )!;
  assert.equal(r.until, "2026-09-08T00:00:00-03:00");
  assert.equal(
    dateRange(new URL("https://test/?start=2026-02-30&end=2026-03-02")),
    null,
  );
  assert.equal(
    dateRange(new URL("https://test/?start=2020-01-01&end=2026-09-07")),
    null,
  );
});
test("device and browser contain no complete user agent", () => {
  assert.equal(deviceCategory("iPhone Mobile Safari"), "mobile");
  assert.equal(browserCategory("Chrome/120 Edg/120"), "Edge");
});
