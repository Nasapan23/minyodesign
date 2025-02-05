import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Minyo Design - Design Grafic & Branding cu Elemente 3D",
  description: "Minyo Design oferă servicii profesionale de design grafic, branding și identitate vizuală, integrând creativ elemente 3D pentru un impact vizual deosebit.",
  keywords: "design grafic profesional, branding și identitate vizuală, studio de creație vizuală, design digital personalizat, grafică publicitară de impact, servicii de design grafic și modelare 3D, vizualizări 3D pentru proiecte, integrarea modelării 3D în branding",
  author: "Minyo Design",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Minyo Design - Design Grafic & Branding cu Elemente 3D",
    description: "Studio de creație vizuală specializat în design grafic, branding și identitate vizuală, cu integrare creativă a elementelor 3D.",
    url: "https://minyodesign.ro",
    type: "website",
    images: [
      {
        url: "https://minyodesign.ro/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Minyo Design - Design Grafic & Branding cu Elemente 3D"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@MinyoDesign",
    title: "Minyo Design - Design Grafic & Branding cu Elemente 3D",
    description: "Oferim servicii de branding și design grafic, cu integrare creativă a elementelor 3D pentru un impact vizual puternic.",
    image: "https://minyodesign.ro/og-image.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <meta name="apple-mobile-web-app-title" content="MinyoDesign" />
      <body className={lato.className}>{children}</body>
    </html>
  );
}
