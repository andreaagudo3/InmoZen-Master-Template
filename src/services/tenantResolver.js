import { supabase } from './supabaseClient'

/**
 * resolveTenantConfig — Core logic to determine which tenant should be active
 * based on the hostname, search parameters, and database records.
 * 
 * @param {string} hostname - window.location.hostname
 * @param {URLSearchParams} params - window.location.search params
 * @returns {Promise<{ data: any, isMaster: boolean, isDemoMode: boolean, error: string|null }>}
 */
export async function resolveTenantConfig(hostname, params) {
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
  const isMasterProd = hostname === 'zendoapp.com' || hostname === 'www.zendoapp.com';
  const isSubdomain = hostname.endsWith('.zendoapp.com') && !isMasterProd;

  let slugToFetch = null;
  let customDomainToFetch = null;

  // 1. RESOLUTION STRATEGY
  if (isLocal) {
    slugToFetch = params.get('tenant');
    if (!slugToFetch) {
      return { data: null, isMaster: true, isDemoMode: false, error: null };
    }
  } else if (isMasterProd) {
    slugToFetch = 'zendo';
  } else if (isSubdomain) {
    slugToFetch = hostname.split('.')[0];
  } else {
    customDomainToFetch = hostname;
  }

  try {
    let query = supabase.from('tenants').select('*');

    if (slugToFetch) {
      query = query.eq('slug', slugToFetch);
    } else if (customDomainToFetch) {
      query = query.eq('custom_domain', customDomainToFetch);
    }

    const { data, error: dbError } = await query.single();

    if (dbError || !data) {
      if (slugToFetch === 'zendo') {
        // Fallback for master if database record is missing
        return { data: null, isMaster: true, isDemoMode: false, error: null };
      }
      return {
        data: null,
        isMaster: false,
        isDemoMode: false,
        error: 'Inmobiliaria no encontrada. El dominio o subdominio no existe en nuestro sistema.'
      };
    }

    return {
      data,
      isMaster: data.slug === 'zendo',
      isDemoMode: !!data.features?.isDemo,
      error: null
    };
  } catch (err) {
    console.error('[resolveTenantConfig] Critical error:', err);
    return { data: null, isMaster: false, isDemoMode: false, error: 'Error crítico al cargar el sitio.' };
  }
}
