import { create } from 'zustand'
import { SITE } from '../config/siteConfig'
import { injectTheme } from '../utils/themeInjector'

export const useThemeStore = create((set) => ({
  theme: SITE.theme || 'MINIMAL',
  primaryColor: SITE.branding?.primaryColor || '#23c698',
  
  setTheme: (newTheme) => set((state) => {
    injectTheme(newTheme, state.primaryColor)
    return { theme: newTheme }
  }),
  
  setPrimaryColor: (newColor) => set((state) => {
    injectTheme(state.theme, newColor)
    return { primaryColor: newColor }
  }),
}))
