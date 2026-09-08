import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { profile } from "@/lib/profile";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Marcos Mendes | Desenvolvedor Full Stack",
    template: "%s | Marcos Mendes",
  },
  description:
    "Desenvolvimento web, backend, dados e infraestrutura. Conheça os projetos de Marcos Mendes, profissional de TI e AWS Certified Cloud Practitioner.",
  openGraph: {
    title: "Marcos Mendes · Desenvolvimento Full Stack",
    description:
      "Da interface à infraestrutura. Projetos, experiência e tecnologia aplicada.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Marcos Mendes, Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </head>
      <body>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: "Desenvolvedor Full Stack",
              sameAs: [profile.github, profile.linkedin],
              knowsAbout: [
                "Desenvolvimento web",
                "Redes de computadores",
                "Linux",
                "AWS",
              ],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                name: "AWS Certified Cloud Practitioner",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
