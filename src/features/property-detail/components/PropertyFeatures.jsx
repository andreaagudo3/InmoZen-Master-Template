import { useTranslation } from 'react-i18next'

export function PropertyFeatures({ bedrooms, bathrooms, size_m2 }) {
  const { t } = useTranslation('property')

  const SPECS = [
    bedrooms != null && {
      icon: '🛏️',
      label: bedrooms === 0
        ? t('features.bedrooms_other', { count: 0 })
        : t('features.bedrooms_one', { count: bedrooms, defaultValue_other: t('features.bedrooms_other', { count: bedrooms }) }),
    },
    bathrooms != null && {
      icon: '🚿',
      label: t('features.bathrooms_one', { count: bathrooms, defaultValue_other: t('features.bathrooms_other', { count: bathrooms }) }),
    },
    size_m2 != null && {
      icon: '📐',
      label: t('features.size', { size: size_m2 }),
    },
  ].filter(Boolean)

  if (SPECS.length === 0) return null

  return (
    <section aria-label="Características del inmueble">
      <h2 className="text-lg font-semibold text-secondary-900 mb-4">{t('features.title', 'Características')}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list">
        {SPECS.map(({ icon, label }) => (
          <li key={label} className="bg-white border border-secondary-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl mb-2" aria-hidden="true">{icon}</span>
            <span className="text-sm font-semibold text-secondary-800 text-center leading-tight">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
