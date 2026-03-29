/**
 * slugify.js — Utilidades para generar slugs y reference codes.
 */

/**
 * Convierte un texto a slug URL-safe.
 * Ejemplo: "Casa en Aracena" → "casa-en-aracena"
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toString()
    .normalize('NFD')                        // separar caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '')         // eliminar diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')           // eliminar caracteres especiales
    .replace(/\s+/g, '-')                    // espacios → guiones
    .replace(/-+/g, '-')                     // colapsar guiones múltiples
}

/**
 * Genera un reference code único tipo A + número (A100–A999).
 * @returns {string} ej. "A738"
 */
export function generateReferenceCode() {
  const num = Math.floor(Math.random() * 900) + 100
  return `A${num}`
}
