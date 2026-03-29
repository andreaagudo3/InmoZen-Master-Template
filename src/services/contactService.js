/**
 * contactService.js — Servicio para envíos de formularios.
 */

import { supabase } from './supabaseClient'

/**
 * Llama a la Edge Function de Supabase para enviar un email.
 * @param {Object} payload 
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} payload.message
 * @param {string} payload.property
 * @returns {Promise<void>} Throws error if request fails
 */
export async function sendContactEmail({ name, email, message, property }) {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { name, email, message, property }
  })

  // supabase.functions.invoke ya lanza un error si hay fallos HTTP 5xx, pero si devuelve error lo lanzamos
  if (error) {
    console.error('[sendContactEmail] Error:', error)
    throw error
  }

  return data
}
