import { useEffect } from 'react'
import { getProperties } from './propertyService'

/**
 * useProperties — hook de servicio que carga propiedades desde Supabase.
 *
 * Mantiene la misma interfaz que la versión mock:
 *   el store recibe setProperties / setLoading / setError sin cambios.
 *
 * @param {object} store  Objeto retornado por usePropertiesStore()
 */
export function useProperties(store) {
  const { setProperties, setLoading, setError } = store

  useEffect(() => {
    let cancelled = false

    async function loadProperties() {
      setLoading(true)
      setError(null)

      try {
        const data = await getProperties()

        if (!cancelled) {
          setProperties(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Error al cargar las propiedades')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProperties()

    return () => {
      cancelled = true
    }
  }, [setProperties, setLoading, setError])
}
