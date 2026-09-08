"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownToLine, LogOut, ShieldCheck, RefreshCw } from "lucide-react";
import { projects } from "@/lib/projects";
type Metrics = {
  totalDownloads: number;
  todayDownloads: number;
  weekDownloads: number;
  monthDownloads: number;
  visits: number;
  downloads: number;
  clicks: number;
  projectViews: number;
  daily: { day: string; visits: number; downloads: number }[];
  projects: { target: string; count: number }[];
  links: { target: string; count: number }[];
};
type EventRow = {
  id: number;
  created_at: string;
  event_type: string;
  target: string;
  source: string;
  device: string;
  browser: string;
};
export function AdminLogin({ ready }: { ready: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      const result = await response.json();
      if (response.ok) router.refresh();
      else setError(result.error || "Não foi possível entrar.");
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="login-card">
      <ShieldCheck size={36} />
      <div className="eyebrow">ACESSO RESTRITO</div>
      <h1>Área privada</h1>
      <p>Indicadores e registros do portfólio.</p>
      {!ready && (
        <div className="project-note">
          <strong>Configuração pendente</strong>
          <p>
            Conecte o Supabase e cadastre o proprietário para habilitar o
            painel. As instruções estão no README do projeto.
          </p>
        </div>
      )}
      <form className="login-form" onSubmit={login}>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            disabled={!ready}
          />
        </label>
        <label>
          Senha
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={256}
            disabled={!ready}
          />
        </label>
        <button className="button" disabled={!ready || busy}>
          {busy ? "Entrando..." : "Entrar com segurança"}
        </button>
        <p role="alert" className="form-feedback">
          {error}
        </p>
      </form>
    </div>
  );
}
const eventLabels: Record<string, string> = {
  visit: "Visita",
  project_view: "Projeto",
  link_click: "Clique",
  cv_download: "Currículo",
};
export function AdminPanel() {
  const router = useRouter();
  const [start, setStart] = useState(
    new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10),
  );
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [rows, setRows] = useState<EventRow[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const query = `start=${start}&end=${end}`;
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    Promise.all([
      fetch(`/api/admin/metrics?${query}`),
      fetch(`/api/admin/events?${query}&page=${page}`),
    ])
      .then(async (responses) => {
        if (responses.some((r) => r.status === 401)) {
          router.refresh();
          throw new Error("Sua sessão expirou. Entre novamente.");
        }
        if (responses.some((r) => !r.ok))
          throw new Error(
            "Não foi possível carregar. Verifique o período (até 366 dias) e tente novamente.",
          );
        const [m, e] = await Promise.all(responses.map((r) => r.json()));
        if (!cancelled) {
          setMetrics(m);
          setRows(e.rows);
          setCount(e.count);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
          setMetrics(null);
          setRows([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, page, refresh, router]);
  async function logout() {
    const result = await fetch("/api/auth/logout", { method: "POST" });
    if (result.ok) router.refresh();
    else setError("Não foi possível encerrar a sessão.");
  }
  function label(target: string) {
    return projects.find((p) => p.slug === target)?.title || target;
  }
  return (
    <div className="admin-panel">
      <div className="section-heading">
        <div>
          <div className="eyebrow">SOMENTE VOCÊ</div>
          <h1>Seu portfólio em números.</h1>
        </div>
        <button className="button button-outline" onClick={logout}>
          Sair <LogOut size={16} />
        </button>
      </div>
      <div className="admin-toolbar">
        <label>
          De
          <input
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <label>
          Até
          <input
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <button
          className="icon-button"
          onClick={() => setRefresh((r) => r + 1)}
          aria-label="Atualizar indicadores"
        >
          <RefreshCw size={18} />
        </button>
        <a
          className="button button-outline"
          href={`/api/admin/export?${query}&format=csv`}
        >
          <ArrowDownToLine size={16} /> CSV
        </a>
        <a
          className="button button-outline"
          href={`/api/admin/export?${query}&format=txt`}
        >
          TXT
        </a>
      </div>
      <p className="admin-note">
        Horários de Brasília. Estatísticas de visitantes que permitiram a
        coleta; não representam pessoas únicas. Downloads medem o início da
        entrega do arquivo.
      </p>
      {error && (
        <p role="alert" className="form-feedback">
          {error}
        </p>
      )}
      {loading && <p role="status">Carregando indicadores...</p>}
      {metrics && !loading && (
        <>
          <div className="metric-grid">
            {[
              ["Downloads acumulados", metrics.totalDownloads],
              ["Hoje", metrics.todayDownloads],
              ["Esta semana", metrics.weekDownloads],
              ["Este mês", metrics.monthDownloads],
              ["Visitas no período", metrics.visits],
              ["Downloads no período", metrics.downloads],
              ["Projetos vistos", metrics.projectViews],
              ["Cliques no período", metrics.clicks],
            ].map(([title, value]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{Number(value).toLocaleString("pt-BR")}</strong>
              </article>
            ))}
          </div>
          <section className="admin-chart">
            <h2>Visitas e downloads por dia</h2>
            {metrics.daily.length ? (
              <div className="daily-chart">
                {metrics.daily.map((day) => (
                  <div className="daily-row" key={day.day}>
                    <time>
                      {day.day.slice(5).split("-").reverse().join("/")}
                    </time>
                    <div>
                      <span
                        className="visit-bar"
                        style={{
                          width: `${Math.max(1, (day.visits / Math.max(...metrics.daily.map((d) => d.visits), 1)) * 100)}%`,
                        }}
                      />
                      <span
                        className="download-bar"
                        style={{
                          width: `${Math.max(1, (day.downloads / Math.max(...metrics.daily.map((d) => d.visits + d.downloads), 1)) * 100)}%`,
                        }}
                      />
                    </div>
                    <span>
                      {day.visits} visitas · {day.downloads} downloads
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhum evento no período selecionado.</p>
            )}
          </section>
          <div className="ranking-grid">
            {[
              ["Projetos mais acessados", metrics.projects],
              ["Links mais clicados", metrics.links],
            ].map(([title, items]) => (
              <section key={title as string}>
                <h2>{title as string}</h2>
                {(items as Metrics["projects"]).length ? (
                  (items as Metrics["projects"]).map((item) => (
                    <div className="ranking-row" key={item.target}>
                      <span>{label(item.target)}</span>
                      <strong>{item.count}</strong>
                    </div>
                  ))
                ) : (
                  <p>Nenhum registro neste período.</p>
                )}
              </section>
            ))}
          </div>
        </>
      )}
      <section className="history-section">
        <h2>Histórico de registros</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Data e hora</th>
                <th>Evento</th>
                <th>Destino</th>
                <th>Origem</th>
                <th>Dispositivo</th>
                <th>Navegador</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    {new Date(row.created_at).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                    })}
                  </td>
                  <td>{eventLabels[row.event_type]}</td>
                  <td>{label(row.target)}</td>
                  <td>{row.source}</td>
                  <td>{row.device}</td>
                  <td>{row.browser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && !loading && <p>Nenhum registro encontrado.</p>}
        <div className="pagination">
          <button
            className="button button-outline button-small"
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>
          <span>
            Página {page + 1} · {count} registros
          </span>
          <button
            className="button button-outline button-small"
            disabled={(page + 1) * 30 >= count || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      </section>
    </div>
  );
}
