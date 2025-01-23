import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import { FormProvider } from "./context/formContext";

const PetrobrasSans = localFont({
  src: [
    {
      path: "./fonts/PetrobrasSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PetrobrasSans-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PetrobrasSans-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/PetrobrasSans-Light.woff",
      weight: "300",
      style: "normal",
    },
    // end
  ],
  variable: "--font-petrobras-sans",
});
export const runtime = "edge";

export const metadata: Metadata = {
  title: "Vibra BB",
  description: "Solicite seu cartão Petrobrás",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <FormProvider>
        <body className={PetrobrasSans.className}>{children}</body>
      </FormProvider>
    </html>
  );
}
