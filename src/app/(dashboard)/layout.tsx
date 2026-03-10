import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { UserSync } from "@/components/shared/user-sync";

// Dashboard pages require Clerk auth — prevent static prerendering
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <UserSync />
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
