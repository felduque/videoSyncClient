import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Footer, Navigation } from "@/components/layout/index";

export const metadata: Metadata = {
    title: "SyncWatch",
    description: "SyncWatch - A video chat application",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
    </>
);
}
