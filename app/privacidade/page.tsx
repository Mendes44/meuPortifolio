import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/lib/profile";
export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Como este portfólio trata mensagens de contato e estatísticas opcionais.",
};
export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="container section legal-page">
        <div className="eyebrow">SEUS DADOS</div>
        <h1>Privacidade</h1>
        <p>Última atualização: setembro de 2026.</p>
        <h2>Contato</h2>
        <p>
          Marcos Mendes utiliza nome, e-mail e mensagem para responder ao seu
          contato. O formulário usa um serviço de envio de e-mail (Resend),
          quando configurado. As mensagens ficam na caixa de e-mail e são
          mantidas pelo tempo necessário à conversa e às obrigações aplicáveis.
          Não inclua senhas ou informações sensíveis.
        </p>
        <h2>Estatísticas opcionais</h2>
        <p>
          Somente com sua permissão, o site registra visitas a páginas, cliques
          em links, visualizações de projetos e início de entrega do currículo.
          Os registros incluem horário, caminho da página sem parâmetros,
          categoria do dispositivo e nome genérico do navegador. Não identificam
          visitantes únicos e não comprovam que um arquivo foi salvo.
        </p>
        <p>
          Esses dados ficam no Supabase por até 12 meses quando o serviço e a
          rotina de retenção estão configurados. Não são usados para
          publicidade. Você pode alterar a escolha no botão “Privacidade”.
          Recusar não impede o contato ou o download.
        </p>
        <h2>Segurança e preferências</h2>
        <p>
          O tema é salvo apenas neste navegador. Um cookie guarda sua escolha
          sobre estatísticas por seis meses. A área administrativa usa um cookie
          de sessão protegido e restrito ao proprietário. Para limitar abuso, o
          servidor pode usar um identificador temporário derivado do endereço de
          conexão, quando configurado pela hospedagem, sem armazenar o IP
          completo no banco. Esses identificadores são removidos após 24 horas
          pela rotina de limpeza.
        </p>
        <h2>Serviços externos</h2>
        <p>
          GitHub, LinkedIn e WhatsApp possuem suas próprias políticas. Os
          serviços de hospedagem, banco de dados e envio de e-mail também podem
          processar logs operacionais conforme suas políticas e configurações.
          Fontes e ícones são servidos localmente.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Para consultar, corrigir ou solicitar exclusão de dados de contato,
          escreva para <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          As estatísticas não possuem um identificador persistente que permita
          associá-las a uma pessoa específica.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
