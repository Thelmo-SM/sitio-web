const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 border-t-gray-400 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo / Descripción */}
        <div>
          <h3 className="text-2xl font-bold text-gray-400 mb-4">CellStore</h3>
          <p className="text-sm text-gray-500">
            Venta de celulares, accesorios y reparaciones profesionales.
            Calidad, confianza y atención personalizada.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-lg font-semibold text-gray-400 mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm md:text-base">
            <li><a href="#inicio" className="hover:text-white">Inicio</a></li>
            <li><a href="#productos" className="hover:text-white">Productos</a></li>
            <li><a href="#servicios" className="hover:text-white">Reparaciones</a></li>
            <li><a href="#ubicacion" className="hover:text-white">Ubicación</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold text-gray-400 mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm md:text-base">
            <li>📍 Av. Principal #123</li>
            <li>📞 +1 809 000 0000</li>
            <li>✉️ contacto@cellstore.com</li>
            <li>🕘 Lun - Vie: 9AM - 7PM</li>
          </ul>
        </div>

        {/* Redes / WhatsApp */}
        <div>
          <h4 className="text-lg font-semibold text-gray-400 mb-4">Síguenos</h4>
          <div className="flex gap-4 mb-4 text-sm md:text-base">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>

          <a
            href="https://wa.me/18090000000"
            target="_blank"
            className="inline-block bg-green-800 text-gray-200 px-4 py-2 rounded text-sm font-semibold hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-800 mt-10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CellStore. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
