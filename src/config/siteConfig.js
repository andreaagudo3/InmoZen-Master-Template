/**
 * siteConfig.js — Configuración central del negocio.
 *
 * ✏️  Edita SOLO este archivo para actualizar los datos de contacto,
 *     nombre del negocio y zona geográfica en toda la web.
 */

export const SITE = {
  /** Nombre comercial que aparece en títulos y textos */
  name: 'Parque Sierra',
  /** Subtítulo / actividad */
  tagline: 'Inmobiliaria',
  /** Nombre completo para SEO y cabeceras formales */
  fullName: 'Parque Sierra Inmobiliaria',

  /** Zona de actuación (aparece en hero, footer, contacto…) */
  zone: 'Sierra de Aracena y Picos de Aroche',
  /** Nombre corto de la zona para el hero (más conciso) */
  heroZone: 'Sierra de Aracena',
  province: 'Huelva',
  country: 'España',

  /** Teléfonos de contacto */
  phones: [
    { number: '680 68 64 55', href: 'tel:+34680686455' }
  ],

  /** Email de contacto */
  email: {
    address: 'auroraparquesierra@gmail.com',
    href: 'mailto:auroraparquesierra@gmail.com',
  },

  /** Redes sociales (href: '#' = sin enlace todavía) */
  socials: [
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
  ],
}
