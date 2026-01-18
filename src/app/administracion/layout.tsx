// app/administracion/update-content/layout.tsx
import AuthGuard from "@/components/AuthGuard";
import { AdminNav } from "@/features/adminComponents/AdminNav";
export default function UpdateContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
    <section className="admin-layout">
      <AdminNav />
      {/* Aquí puedes poner un menú lateral o un header de admin si quieres */}
      {children} 
    </section>
    </AuthGuard>
  );
}