begin;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_admins enable row level security;
drop policy if exists "admin sees own membership" on public.portfolio_admins;
create policy "admin sees own membership" on public.portfolio_admins for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;
grant all on public.portfolio_admins to service_role;

create table if not exists public.portfolio_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event_type text not null check (event_type in ('visit','project_view','link_click','cv_download')),
  target text not null check (length(target) between 1 and 100),
  source text not null check (source ~ '^/[a-z0-9/-]*$' and length(source) <= 160),
  device text not null check (device in ('desktop','mobile','tablet')),
  browser text not null check (browser in ('Chrome','Edge','Safari','Firefox','Outro'))
);
create index if not exists portfolio_events_time on public.portfolio_events(created_at desc, id desc);
create index if not exists portfolio_events_type_time on public.portfolio_events(event_type, created_at desc);
alter table public.portfolio_events enable row level security;
drop policy if exists "owner reads analytics" on public.portfolio_events;
create policy "owner reads analytics" on public.portfolio_events for select to authenticated
using (exists(select 1 from public.portfolio_admins where user_id = (select auth.uid())));
revoke all on public.portfolio_events from anon, authenticated;
grant select on public.portfolio_events to authenticated;
grant all on public.portfolio_events to service_role;
grant usage, select on sequence public.portfolio_events_id_seq to service_role;

create table if not exists public.portfolio_totals (
  name text primary key,
  total bigint not null default 0
);
alter table public.portfolio_totals enable row level security;
drop policy if exists "owner reads totals" on public.portfolio_totals;
create policy "owner reads totals" on public.portfolio_totals for select to authenticated
using (exists(select 1 from public.portfolio_admins where user_id=(select auth.uid())));
revoke all on public.portfolio_totals from anon,authenticated;
grant select on public.portfolio_totals to authenticated;
grant all on public.portfolio_totals to service_role;
insert into public.portfolio_totals(name,total)
select 'cv_download',count(*) from public.portfolio_events where event_type='cv_download'
on conflict(name) do nothing;
create or replace function public.portfolio_increment_downloads()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  if new.event_type='cv_download' then
    insert into public.portfolio_totals(name,total) values('cv_download',1)
    on conflict(name) do update set total=public.portfolio_totals.total+1;
  end if;
  return new;
end $$;
revoke all on function public.portfolio_increment_downloads() from public,anon,authenticated;
drop trigger if exists portfolio_download_counter on public.portfolio_events;
create trigger portfolio_download_counter after insert on public.portfolio_events
for each row execute function public.portfolio_increment_downloads();

create table if not exists public.portfolio_rate_limits (
  client_key text not null,
  scope text not null,
  bucket timestamptz not null,
  attempts integer not null default 1,
  primary key(client_key,scope,bucket)
);
alter table public.portfolio_rate_limits enable row level security;
revoke all on public.portfolio_rate_limits from anon, authenticated;
grant all on public.portfolio_rate_limits to service_role;

create or replace function public.portfolio_take_rate_limit(p_key text,p_scope text,p_limit integer)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_attempts integer; v_bucket timestamptz := to_timestamp(floor(extract(epoch from now())/600)*600);
begin
  if p_key !~ '^[a-f0-9]{64}$' or p_scope not in ('login','contact','events') or p_limit < 1 or p_limit > 100 then return false; end if;
  delete from public.portfolio_rate_limits where bucket < now() - interval '24 hours';
  insert into public.portfolio_rate_limits(client_key,scope,bucket) values(p_key,p_scope,v_bucket)
  on conflict(client_key,scope,bucket) do update set attempts=public.portfolio_rate_limits.attempts+1 returning attempts into v_attempts;
  return v_attempts <= p_limit;
end $$;
revoke all on function public.portfolio_take_rate_limit(text,text,integer) from public, anon, authenticated;
grant execute on function public.portfolio_take_rate_limit(text,text,integer) to service_role;

create or replace function public.portfolio_metrics(p_start date,p_end date)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare result jsonb;
begin
  if not exists(select 1 from public.portfolio_admins where user_id=(select auth.uid())) then raise exception 'not authorized'; end if;
  if p_start is null or p_end is null or p_start > p_end or p_end-p_start > 366 then raise exception 'invalid range'; end if;
  with period as (
    select * from public.portfolio_events where created_at >= p_start::timestamp at time zone 'America/Sao_Paulo'
    and created_at < (p_end+1)::timestamp at time zone 'America/Sao_Paulo'
  ), daily as (
    select (created_at at time zone 'America/Sao_Paulo')::date as day,
      count(*) filter(where event_type='visit') as visits,
      count(*) filter(where event_type='cv_download') as downloads
    from period group by 1
  ), project_counts as (
    select target,count(*) as count from period where event_type='project_view' group by target order by count(*) desc limit 10
  ), link_counts as (
    select target,count(*) as count from period where event_type='link_click' group by target order by count(*) desc limit 10
  )
  select jsonb_build_object(
    'totalDownloads',coalesce((select total from public.portfolio_totals where name='cv_download'),0),
    'todayDownloads',(select count(*) from public.portfolio_events where event_type='cv_download' and created_at >= date_trunc('day',now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo'),
    'weekDownloads',(select count(*) from public.portfolio_events where event_type='cv_download' and created_at >= date_trunc('week',now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo'),
    'monthDownloads',(select count(*) from public.portfolio_events where event_type='cv_download' and created_at >= date_trunc('month',now() at time zone 'America/Sao_Paulo') at time zone 'America/Sao_Paulo'),
    'visits',(select count(*) from period where event_type='visit'),
    'downloads',(select count(*) from period where event_type='cv_download'),
    'clicks',(select count(*) from period where event_type='link_click'),
    'projectViews',(select count(*) from period where event_type='project_view'),
    'daily',coalesce((select jsonb_agg(to_jsonb(daily) order by day) from daily),'[]'::jsonb),
    'projects',coalesce((select jsonb_agg(to_jsonb(project_counts)) from project_counts),'[]'::jsonb),
    'links',coalesce((select jsonb_agg(to_jsonb(link_counts)) from link_counts),'[]'::jsonb)
  ) into result;
  return result;
end $$;
revoke all on function public.portfolio_metrics(date,date) from public,anon;
grant execute on function public.portfolio_metrics(date,date) to authenticated;

create or replace function public.portfolio_cleanup()
returns void language sql security definer set search_path = '' as $$
  delete from public.portfolio_events where created_at < now() - interval '12 months';
  delete from public.portfolio_rate_limits where bucket < now() - interval '24 hours';
$$;
revoke all on function public.portfolio_cleanup() from public,anon,authenticated;
grant execute on function public.portfolio_cleanup() to service_role;

commit;

-- After creating your Auth user, add its real UUID (do not leave the example):
-- insert into public.portfolio_admins(user_id) values ('YOUR_AUTH_USER_UUID');
-- Schedule public.portfolio_cleanup() daily through Supabase Cron.
