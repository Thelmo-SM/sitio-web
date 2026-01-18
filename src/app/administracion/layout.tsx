// app/administracion/update-content/layout.tsx
import { AdminNav } from "@/features/adminComponents/AdminNav";
export default function UpdateContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="admin-layout">
      <AdminNav />
      {/* Aquí puedes poner un menú lateral o un header de admin si quieres */}
      {children} 
    </section>
  );
}