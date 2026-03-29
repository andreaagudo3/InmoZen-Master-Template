import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — resetea el scroll al inicio en cada cambio de ruta.
 * Colócalo dentro del BrowserRouter, una sola vez.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // 'instant' evita animación de scroll y respeta preferencias de movimiento reducido
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
