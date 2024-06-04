import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Antrein - Dashboard",
  description: "Dashboard for Antrein",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar>
             {children}
        </Sidebar>
      </body>
    </html>
  );
}
