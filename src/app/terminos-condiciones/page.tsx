// Página de términos y condiciones
// Rutas: /src/app/terminos-condiciones/page.tsx

import { generatePageMetadata } from "@/utils/pageMetadata";
import { siteConfig } from "@/utils/seoConfig";

export const metadata = generatePageMetadata({
  title: "Términos y Condiciones",
  description: "Lee nuestros términos y condiciones de uso",
  url: `${siteConfig.siteUrl}/terminos-condiciones`,
});

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
      
      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceptación de Términos</h2>
          <p>Al acceder y utilizar este sitio web, aceptas estar vinculado por estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, no debes usar este sitio.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Licencia de Uso</h2>
          <p>{siteConfig.business.name} te concede una licencia limitada, no exclusiva e intransferible para acceder y usar este sitio web únicamente con propósitos legales.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Productos y Servicios</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Nos reservamos el derecho de cambiar precios sin previo aviso</li>
            <li>La disponibilidad de productos está sujeta a inventario</li>
            <li>Las imágenes de productos son ilustrativas</li>
            <li>Nos comprometemos a reparar o reemplazar productos defectuosos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitación de Responsabilidad</h2>
          <p>En ningún caso seremos responsables por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar este sitio.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Contacto</h2>
          <p>Para consultas sobre estos términos, contáctanos en:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Email: {siteConfig.contact.email}</li>
            <li>Teléfono: {siteConfig.contact.phone}</li>
            <li>Dirección: {siteConfig.business.address.streetAddress}, {siteConfig.business.address.addressLocality}</li>
          </ul>
        </section>

        <section className="mt-8 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">Última actualización: {new Date().toLocaleDateString('es-MX')}</p>
        </section>
      </div>
    </div>
  );
}
