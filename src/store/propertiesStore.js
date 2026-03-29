import { useState, useCallback } from 'react'

/**
 * Centralised properties store.
 *
 * Call `usePropertiesStore()` in any component to read state and dispatch actions.
 * For a real app you'd lift this with Context; here it's a self-contained hook
 * that can be promoted easily.
 */

const initialState = {
  properties: [],
  loading: false,
  error: null,
  /** @type {{ type: 'all'|'sale'|'rent', minPrice: number, maxPrice: number, bedrooms: string, location_id: string }} */
  filters: {
    type: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 'all',
    location_id: 'all',
  },
}

export function usePropertiesStore() {
  const [state, setState] = useState(initialState)

  const setProperties = useCallback((properties) => {
    setState((prev) => ({ ...prev, properties }))
  }, [])

  const setLoading = useCallback((loading) => {
    setState((prev) => ({ ...prev, loading }))
  }, [])

  const setError = useCallback((error) => {
    setState((prev) => ({ ...prev, error }))
  }, [])

  const setFilter = useCallback((key, value) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, [key]: value },
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setState((prev) => ({ ...prev, filters: initialState.filters }))
  }, [])

  /** Derived: filtered list based on current filter state */
  const filteredProperties = state.properties.filter((p) => {
    const { type, minPrice, maxPrice, bedrooms, location_id } = state.filters
    if (type !== 'all' && p.listing_type !== type) return false // NOTA: Arreglado p.type a p.listing_type
    if (p.price < minPrice || p.price > maxPrice) return false
    if (bedrooms !== 'all' && String(p.bedrooms) !== bedrooms) return false
    if (location_id !== 'all' && p.location_id !== location_id) return false
    return true
  })

  return {
    ...state,
    filteredProperties,
    setProperties,
    setLoading,
    setError,
    setFilter,
    resetFilters,
  }
}
