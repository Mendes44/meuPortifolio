-- Permite ao formulário público criar contatos sem expor os registros salvos.
alter table public."LEADS2" enable row level security;

revoke all on table public."LEADS2" from anon;
grant insert on table public."LEADS2" to anon;

drop policy if exists "portfolio_public_contact_insert" on public."LEADS2";

create policy "portfolio_public_contact_insert"
on public."LEADS2"
for insert
to anon
with check (
  char_length(trim(nome)) between 2 and 100
  and char_length(trim(email)) between 5 and 254
  and email like '%_@_%._%'
  and char_length(trim(message)) between 10 and 4000
);
