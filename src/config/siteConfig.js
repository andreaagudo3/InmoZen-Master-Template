/**
 * siteConfig.js — Configuración central del negocio.
 *
 * ✏️  Edita SOLO este archivo para actualizar los datos de contacto,
 *     nombre del negocio y zona geográfica en toda la web.
 */

export const SITE = {
  /** 
   * Configuración Principal del Negocio
   * Cambia estos datos para generar una web diferente.
   */
  name: 'InmoZen',
  tagline: 'Real Estate Minimalist',
  fullName: 'InmoZen Real Estate Group',
  
  description: 'Encuentra la casa de tus sueños con la experiencia InmoZen. Lujo, minimalismo y eficiencia.',
  seo: {
    titleTemplate: '%s | InmoZen',
    defaultTitle: 'InmoZen - Real Estate',
  },

  zone: 'Costa del Sol',
  heroZone: 'Marbella & Málaga',
  province: 'Málaga',
  country: 'España',
  address: 'Av. Ricardo Soriano, 12, 29601 Marbella, Málaga',

  phones: [
    { number: '+34 600 00 00 00', href: 'tel:+34600000000' }
  ],

  email: {
    address: 'hello@inmozen.com',
    href: 'mailto:hello@inmozen.com',
  },

  socials: [
    { name: 'Instagram', href: 'https://instagram.com/inmozen' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/inmozen' },
    { name: 'Twitter', href: '#' },
  ],

  /**
   * Identidad Visual
   * Cambia el color primario (ej. #0f172a, #b91c1c, #0d9488) para 
   * rediseñar toda la gama de colores base automáticamente.
   */
  branding: {
    primaryColor: '#0ea5e9', // e.g. un tono azul moderno
  },

  /**
   * Feature Flags (Opciones de la plantilla)
   * Activa (true) o desactiva (false) módulos de la web.
   */
  features: {
    i18n: true,             // Soporte multi-idioma
    googleMaps: true,       // Integración con mapas
    advancedFilters: true,  // Filtros de habitaciones, m2, etc. en búsqueda
    whatsappButton: true,   // Botón flotante de WhatsApp
  }
}
