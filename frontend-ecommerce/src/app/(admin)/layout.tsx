import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/admin/sidebar";

import { Providers } from "../providers";
import { AuthProvider } from "@/context/AuthContext";
import { STORE_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: { default: "Admin", template: `%s · ${STORE_NAME}` },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="white">
      <body>
        <AuthProvider>
          <Providers>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
