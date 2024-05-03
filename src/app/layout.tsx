import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Header from "@/app/components/header";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "AI Image Renew | Elimina el fondo de imágenes y restaura el color de imágenes antiguas",
  description:
    "Aplicación para eliminar fondo de imágenes y restaurar el color de imágenes antiguas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.className} relative`}>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <Header />
        {children}
      </body>
    </html>
  );
}
