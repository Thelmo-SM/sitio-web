// Componente para inyectar datos estructurados (Schema.org JSON-LD)

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string; // ✅ evita duplicados
}

export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export default StructuredData;
