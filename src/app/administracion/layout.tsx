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
    <section className="bg-gray-900">
      <AdminNav />
      {children} 
    </section>
    </AuthGuard>
  );
}