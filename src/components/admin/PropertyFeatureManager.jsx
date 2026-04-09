import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFeatures } from '../../services/adminService'

export default function PropertyFeatureManager({ tenant, selectedFeatureIds, onChange }) {
  const { t } = useTranslation(['admin', 'common', 'features'])
  const [groupedFeatures, setGroupedFeatures] = useState({})
  const [allFeatures, setAllFeatures] = useState([])
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [loading, setLoading] = useState(true)

  // Verify premium plan access: advancedFeatures flag
  const hasAccess = tenant?.effective_features?.advancedFeatures === true

  useEffect(() => {
    async function loadFeatures() {
      setLoading(true)
      const data = await getFeatures()
      setAllFeatures(data || [])
      const grouped = data.reduce((acc, feat) => {
        const cat = feat.category || 'general'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(feat)
        return acc
      }, {})
      
      setGroupedFeatures(grouped)
      const cats = Object.keys(grouped).sort()
      setCategories(cats)
      if (cats.length > 0) setActiveTab(cats[0])
      
      setLoading(false)
    }

    // Even if no access, we might still fetch them to show underneath the overlay, but blur them.
    loadFeatures()
  }, [])

  function handleToggle(featureId) {
    if (!hasAccess) return
    const isSelected = selectedFeatureIds.includes(featureId)
    if (isSelected) {
      onChange(selectedFeatureIds.filter((id) => id !== featureId))
    } else {
      onChange([...selectedFeatureIds, featureId])
    }
  }

  // Prettify fallback when translation isn't found
  function formatFallback(key) {
    if (!key) return ''
    return key.replace(/[-_.]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-secondary-200">
        <p className="text-sm text-secondary-500">{t('common:contact.sending', 'Cargando...')}</p>
      </div>
    )
  }

  if (categories.length === 0) {
    return null // No features exist
  }

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 shadow-sm space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-secondary-700 text-sm uppercase tracking-wide">
            {t('admin:properties.features.title', 'Características Avanzadas')}
          </h2>
          {hasAccess && (
            <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-amber-50/50 border border-amber-200/50 text-amber-700 text-xs font-medium rounded-lg w-fit">
              <span className="text-base leading-none">⚠️</span>
              {t('admin:properties.features.saveReminder', 'Recuerda guardar los cambios al final del formulario para no perder tu selección.')}
            </div>
          )}
        </div>
        {!hasAccess && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {t('admin:seo.lockedBadge', 'No incluido en tu plan')}
          </span>
        )}
      </div>

      {!hasAccess && (
        <div className="flex items-start gap-3 p-4 mb-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 leading-relaxed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          <span>
            {t('admin:properties.features.lockedMsg', 'Para contratar características avanzadas y destacar en los filtros de búsqueda, contacta con contrataciones@zendoapp.es')}
          </span>
        </div>
      )}

      <div className={!hasAccess ? 'opacity-60 transition-all cursor-not-allowed' : ''}>
        
        {/* Selected Features Tags */}
        {selectedFeatureIds.length > 0 && (
          <div className="mb-6 pb-6 border-b border-secondary-100 border-dashed">
            <p className="text-xs font-semibold text-secondary-500 uppercase tracking-wide mb-3">Características Seleccionadas</p>
            <div className="flex flex-wrap gap-2">
              {selectedFeatureIds.map(fid => {
                const feat = allFeatures.find(f => f.id === fid)
                if (!feat) return null
                return (
                  <button
                    key={fid}
                    type="button"
                    disabled={!hasAccess}
                    onClick={() => handleToggle(fid)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors ${!hasAccess ? 'pointer-events-none' : ''}`}
                    title="Clic para deseleccionar"
                  >
                    {t(feat.feature_key, { ns: 'features', defaultValue: formatFallback(feat.feature_key) })}
                    {hasAccess && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Tabs for categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none border-b border-secondary-100">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === cat
                  ? 'text-primary-700 border-b-2 border-primary-700 bg-primary-50/50'
                  : 'text-secondary-500 hover:text-secondary-800 hover:bg-secondary-50 border-b-2 border-transparent'
              }`}
            >
              {t(`admin:properties.features.categories.${cat}`, cat)}
            </button>
          ))}
        </div>

        {/* Feature Checkboxes */}
        {activeTab && groupedFeatures[activeTab] && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 ${!hasAccess ? 'pointer-events-none' : ''}`}>
            {groupedFeatures[activeTab].map((feat) => {
              const isSelected = selectedFeatureIds.includes(feat.id)
              return (
                <label
                  key={feat.id}
                  className={`flex items-start gap-3 p-3 border rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-primary-50 border-primary-300 ring-1 ring-primary-300' 
                      : 'bg-white border-secondary-200'
                  } ${!hasAccess ? 'opacity-80' : 'cursor-pointer hover:border-primary-200 hover:bg-secondary-50'}`}
                >
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      disabled={!hasAccess}
                      checked={isSelected}
                      onChange={() => handleToggle(feat.id)}
                      className={`w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-secondary-300 ${!hasAccess ? 'bg-secondary-100 cursor-not-allowed' : 'pointer-events-none'}`}
                    />
                  </div>
                  <div>
                     <span className={`text-sm font-medium block ${isSelected ? 'text-primary-900' : 'text-secondary-700'}`}>
                       {t(feat.feature_key, { ns: 'features', defaultValue: formatFallback(feat.feature_key) })}
                     </span>
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
