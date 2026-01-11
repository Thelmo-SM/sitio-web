// Generar imagen de Open Graph automáticamente
// Para compartir en redes sociales

import { ImageResponse } from 'next/og'
import { siteConfig } from '@/utils/seoConfig'

export const runtime = 'edge'

export const alt = siteConfig.siteName
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 60 }}>📱</div>
        <div>{siteConfig.siteName}</div>
        <div style={{ fontSize: 40, marginTop: 20 }}>
          Venta y Servicio Técnico
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
