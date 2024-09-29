import type { Metadata } from "next";
import Navbar from "@/common/components/navbar/navbar";
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
      <body className="text-gray-800">
        <div className="bg-gray-100 flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
