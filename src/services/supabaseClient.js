/**
 * supabaseClient.js — Cliente Supabase singleton.
 *
 * Importa este módulo en cualquier servicio que necesite acceder a la BD:
 *   import { supabase } from './supabaseClient'
 *
 * Las variables de entorno se definen en el archivo .env del proyecto.
 * Vite requiere el prefijo VITE_ para exponerlas al cliente.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Supabase] Faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY.\n' +
    'Crea un archivo .env en la raíz del proyecto con esos valores.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
