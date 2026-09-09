# Portfólio de Marcos Mendes

Portfólio profissional em Next.js com projetos organizados por área e tecnologia, páginas de detalhes, currículo, contato, tema claro/escuro e uma área administrativa opcional para estatísticas consentidas.

## Tecnologias

- Next.js 16, React 19 e TypeScript;
- CSS responsivo e Lucide React;
- Supabase Auth e PostgreSQL para a área administrativa;
- Resend para entrega do formulário de contato;
- testes com Node Test Runner e PostgreSQL local via PGlite.

## Executar somente o portfólio

Requisitos: Node.js 22.13 ou superior e npm.

No PowerShell, abra a pasta do projeto:

```powershell
cd C:\Temp\ProjetosPessoais\meuPortifolio
npm.cmd install
npm.cmd run dev
```

Depois acesse [http://127.0.0.1:3000](http://127.0.0.1:3000). Para encerrar o servidor, pressione `Ctrl+C` no terminal.

O site público, os filtros, as páginas dos projetos, o tema e o download do currículo funcionam sem Supabase. Sem as variáveis opcionais, o formulário informa que está indisponível e `/admin` mostra a configuração pendente.

## Verificações locais

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

Para testar a versão de produção depois do build:

```powershell
npm.cmd run start
```

## Estrutura principal

```text
app/                  páginas e rotas HTTP
components/           cabeçalho, projetos, contato e painel
lib/projects.ts       catálogo e classificação dos projetos
lib/technologies.ts   tecnologias por categoria
lib/server.ts         autenticação, banco e eventos no servidor
public/               imagens, ícones, fontes e currículo
supabase/migrations/  banco, RLS, métricas e retenção
tests/                filtros, validação e políticas PostgreSQL
```

Para adicionar ou atualizar um projeto, edite `lib/projects.ts`. Um projeto pode ter mais de uma área, como `Full Stack` e `Dados`, e várias tecnologias. Projetos sem demonstração usam apenas o link do GitHub; o Mesa Certa aparece com código privado.

## Configurar Supabase e painel administrativo

1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute `supabase/migrations/001_portfolio.sql`.
3. Em Authentication, crie o seu usuário com e-mail e senha. Desative cadastro público nas configurações de autenticação.
4. Copie o UUID do usuário em Authentication > Users.
5. Execute no SQL Editor, trocando o UUID:

```sql
insert into public.portfolio_admins(user_id)
values ('SEU_UUID_DE_USUARIO');
```

6. Copie `.env.example` para `.env.local` e preencha `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `SUPABASE_ADMIN_USER_ID`.
7. Gere `RATE_LIMIT_SECRET` com pelo menos 32 bytes aleatórios. Ele nunca deve ser publicado.
8. Configure uma rotina diária no Supabase Cron para executar `select public.portfolio_cleanup();`. O histórico fica por 12 meses; o total acumulado de downloads é preservado.

Somente o UUID definido em `SUPABASE_ADMIN_USER_ID` e cadastrado em `portfolio_admins` entra no painel. A chave `SUPABASE_SERVICE_ROLE_KEY` existe apenas no servidor e não deve receber o prefixo `NEXT_PUBLIC_`.

## Configurar o formulário de contato

Crie uma chave no Resend e valide um domínio remetente. No `.env.local`, preencha:

```env
RESEND_API_KEY=
CONTACT_FROM=Portfolio <contato@seudominio.com>
```

As mensagens serão encaminhadas para `marcosmendes.dev@gmail.com`. O formulário inclui validação no cliente e no servidor, honeypot, limite de frequência e resposta clara em caso de erro.

## Variáveis de ambiente

Use `.env.example` como referência. Em produção, defina `NEXT_PUBLIC_SITE_URL` com a origem final, sem barra no final. Configure `TRUSTED_CLIENT_IP_HEADER` apenas quando a hospedagem garantir que esse cabeçalho é sobrescrito; na Vercel, use `x-vercel-forwarded-for`.

## Estatísticas e privacidade

Visitas, visualizações de projetos, cliques e início do download só são registrados após consentimento. O banco recebe horário, rota sem parâmetros, categoria do dispositivo e navegador genérico. O endereço IP completo e o user-agent completo não são armazenados. A página `/privacidade` explica o tratamento dos dados.

O painel em `/admin` apresenta downloads acumulados e por período, visitas, visualizações de projetos, links clicados, histórico paginado e exportação CSV/TXT. O CSV neutraliza valores que poderiam ser interpretados como fórmulas por planilhas.

## Publicação

Configure as mesmas variáveis no provedor de hospedagem e rode `npm.cmd run build`. Na Vercel, importe o repositório como projeto Next.js. Depois do primeiro domínio definitivo, atualize `NEXT_PUBLIC_SITE_URL` e faça um novo deploy para gerar metadados, sitemap e validações de origem corretos.

Não envie `.env.local`, senhas ou chaves para o Git. O `.gitignore` já exclui esses arquivos.
