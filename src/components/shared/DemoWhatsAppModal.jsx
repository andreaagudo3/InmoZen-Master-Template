import { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * DemoWhatsAppModal
 * Shown only in demo mode when a user clicks a WhatsApp button.
 * Asks the visitor for their own phone number so they can experience
 * the message flow. The number is never stored anywhere.
 *
 * @param {{ message: string, onClose: () => void }} props
 */
export function DemoWhatsAppModal({ message, onClose }) {
  const { t } = useTranslation('common')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  function handleOpen() {
    const cleaned = phone.replace(/\s+/g, '')
    if (!cleaned) {
      setError(t('whatsapp.demoLabel'))
      return
    }
    const link = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
    window.open(link, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-wa-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4"
        style={{ animation: 'demoModalIn .25s ease' }}
      >
        <style>{`
          @keyframes demoModalIn {
            from { opacity: 0; transform: translateY(16px) scale(.97); }
            to   { opacity: 1; transform: none; }
          }
        `}</style>

        {/* Header */}
        <div>
          <h2 id="demo-wa-title" className="text-lg font-bold text-secondary-900">
            {t('whatsapp.demoTitle')}
          </h2>
          <p className="text-sm text-secondary-500 mt-1 leading-relaxed">
            {t('whatsapp.demoDesc')}
          </p>
        </div>

        {/* Input */}
        <div>
          <label htmlFor="demo-wa-phone" className="block text-sm font-medium text-secondary-700 mb-1">
            {t('whatsapp.demoLabel')}
          </label>
          <input
            id="demo-wa-phone"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setError('') }}
            placeholder={t('whatsapp.demoPlaceholder')}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 transition ${
              error ? 'border-red-400 focus:ring-red-400' : 'border-secondary-200 focus:ring-[#25D366]'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
            autoFocus
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        {/* Privacy notice */}
        <p className="text-xs text-secondary-400 leading-relaxed">
          {t('whatsapp.demoPrivacy')}
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-secondary-200 text-secondary-600 text-sm font-semibold hover:bg-secondary-50 transition-colors"
          >
            {t('whatsapp.demoCancel')}
          </button>
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t('whatsapp.demoBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
