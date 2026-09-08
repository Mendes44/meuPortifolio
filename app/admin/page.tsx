import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { AdminLogin, AdminPanel } from "@/components/admin-panel";
import { adminSession, configured } from "@/lib/server";
export const metadata: Metadata = {
  title: "Área privada",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function Admin() {
  const session = await adminSession();
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="container section">
        {session ? <AdminPanel /> : <AdminLogin ready={configured()} />}
      </main>
    </>
  );
}
