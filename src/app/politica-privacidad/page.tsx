// Página de política de privacidad
// Ruta: /src/app/politica-privacidad/page.tsx

import { generatePageMetadata } from "@/utils/pageMetadata";
import { siteConfig } from "@/utils/seoConfig";

export const metadata = generatePageMetadata({
  title: "Política de Privacidad",
  description: "Conoce cómo protegemos tu información personal",
  url: `${siteConfig.siteUrl}/politica-privacidad`,
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introducción</h2>
          <p>
            {siteConfig.business.name} (&quot;nosotros&quot;, &quot;nuestro&quot; o
            &quot;la empresa&quot;) se compromete a proteger tu privacidad. Esta
            Política de Privacidad explica cómo recopilamos, usamos, compartimos
            y protegemos tu información.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Información que Recopilamos
          </h2>
          <p>Recopilamos información que proporcionas voluntariamente, incluyendo:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Dirección de envío y facturación</li>
            <li>Información de pago (procesada de manera segura)</li>
            <li>Comentarios y sugerencias</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. Cómo Usamos tu Información
          </h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Procesar transacciones y enviar pedidos</li>
            <li>Enviar actualizaciones sobre tu pedido</li>
            <li>Responder a tus consultas</li>
            <li>Mejorar nuestros servicios</li>
            <li>Enviar información promocional (con tu consentimiento)</li>
            <li>Cumplir con requisitos legales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Seguridad de Datos</h2>
          <p>Utilizamos medidas de seguridad de nivel industrial, incluyendo:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Conexión HTTPS encriptada</li>
            <li>Almacenamiento seguro de datos</li>
            <li>Protección contra acceso no autorizado</li>
            <li>Cumplimiento de estándares de seguridad</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Cookies</h2>
          <p>
            Este sitio utiliza cookies para mejorar tu experiencia de navegación.
            Puedes configurar tu navegador para rechazar cookies, aunque esto
            puede afectar la funcionalidad del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Derechos del Usuario</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Acceder a tus datos personales</li>
            <li>Solicitar la corrección de datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Optar por no recibir comunicaciones marketing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-4">7. Contacto</h2>
          <p>Si tienes preguntas sobre esta política, contáctanos:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Email: {siteConfig.contact.email}</li>
            <li>Teléfono: {siteConfig.contact.phone}</li>
            <li>
              Dirección: {siteConfig.business.address.streetAddress},{" "}
              {siteConfig.business.address.addressLocality}
            </li>
          </ul>
        </section>

        <section className="mt-8 p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-MX")}
          </p>
        </section>
      </div>
    </div>
  );
}
