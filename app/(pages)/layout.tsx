import type { Metadata } from "next";
import Navbar from "@/app/_common/_components/navbar/navbar";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Word synonyms app",
  description: "Reeinvent task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-100 flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
