import { useState } from 'react'
import { useThemeStore } from '../../store/themeStore'

const THEMES = ['MINIMAL', 'CORPORATE', 'PORTAL']
const COLORS = [
  { name: 'Teal (Default)', hex: '#23c698' },
  { name: 'Blue', hex: '#0ea5e9' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Slate', hex: '#475569' },
]

export function DemoPanel() {
  const { theme, setTheme, primaryColor, setPrimaryColor } = useThemeStore()
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 left-4 z-[9999] w-10 h-10 rounded-full bg-secondary-950 border border-white/20 text-white opacity-25 hover:opacity-100 transition-all flex items-center justify-center shadow-lg group focus:outline-none"
        aria-label="Open Demo Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-white border border-secondary-200 shadow-2xl rounded-2xl p-4 flex flex-col gap-5 animate-fade-up max-w-[90vw] sm:max-w-xs origin-bottom-left">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-extrabold text-secondary-900 uppercase tracking-widest">Demo Editor</span>
        <button 
          onClick={() => setIsExpanded(false)}
          className="p-1 rounded-md text-secondary-400 hover:text-secondary-800 hover:bg-secondary-100 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">Structural Theme</span>
        <div className="flex flex-wrap gap-2">
          {THEMES.map(t => (
            <button
              key={t}
              onClick={() => {
                setTheme(t)
                setIsExpanded(false)
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${theme === t ? 'bg-secondary-900 text-white shadow-sm' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-secondary-100" />

      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">Primary Accent</span>
        <div className="flex flex-wrap items-center gap-3">
           {COLORS.map(c => (
             <button
               key={c.hex}
               onClick={() => {
                 setPrimaryColor(c.hex)
                 setIsExpanded(false)
               }}
               className={`w-6 h-6 rounded-full border-2 transition-transform ${primaryColor === c.hex ? 'scale-125 border-secondary-900 shadow-md' : 'border-transparent hover:scale-110'}`}
               style={{ backgroundColor: c.hex }}
               title={c.name}
               aria-label={`Select ${c.name} color`}
             />
           ))}
        </div>
      </div>
    </div>
  )
}
