import { createContext, useContext, useEffect, useState } from 'react'
import { useThemeStore } from '../store/themeStore'
import TenantNotFound from '../pages/error/TenantNotFound'
import { resolveTenantConfig } from '../services/tenantResolver'

const TenantContext = createContext(null)

// Identidad de respaldo para Zendo Maestra
const MASTER_IDENTITY = {
  id: 'master-zendo',
  slug: 'zendo',
  name: 'Zendo',
  isMaster: true,
  primary_color: '#2563eb',
  secondary_color: '#64748b',
  description: 'La plataforma definitiva para la gestión inmobiliaria moderna.',
  meta_title: 'Zendo - SaaS Inmobiliario y CRM para inmobiliarias',
  features: { isDemo: false }
};

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Actualizador de metadatos reactivo
  useEffect(() => {
    if (!tenant) return;
    const pageTitle = tenant.meta_title || (tenant.isMaster ? 'Zendo - SaaS Inmobiliario' : `${tenant.name} - Real Estate`);
    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && tenant.description) metaDesc.setAttribute('content', tenant.description);
    
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = tenant.isMaster ? '/zendo-logo.png' : '/favicon.ico';
  }, [tenant]);

  useEffect(() => {
    async function resolve() {
      const hostname = window.location.hostname;
      const params = new URLSearchParams(window.location.search);
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');

      // Pre-carga agresiva para Master si estamos en el dominio principal o local sin parámetros (UX)
      if (hostname === 'zendoapp.com' || hostname === 'www.zendoapp.com' || (isLocal && !params.get('tenant'))) {
        setTenant(MASTER_IDENTITY);
        useThemeStore.getState().initFromTenant('MINIMAL', '#2563eb', '#64748b');
      }

      const result = await resolveTenantConfig(hostname, params);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.data) {
        const finalTenant = {
          ...result.data,
          isMaster: result.isMaster,
          isDemoMode: result.isDemoMode
        };
        setTenant(finalTenant);
        
        useThemeStore.getState().initFromTenant(
          result.data.theme ?? 'MINIMAL',
          result.data.primary_color ?? (result.isMaster ? '#2563eb' : '#23c698'),
          result.data.secondary_color ?? '#64748b'
        );
      } else if (result.isMaster) {
        // Fallback si no hay data pero es Master
        setTenant(MASTER_IDENTITY);
      }

      setLoading(false);
    }

    resolve();
  }, []);

  // Solo bloqueamos el render si estamos cargando y NO tenemos ni siquiera la identidad maestra
  if (loading && !tenant) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div className="animate-spin" style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '3px solid #e2e8f0', borderTopColor: '#2563eb',
          animation: 'tz-spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes tz-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error) {
    return <TenantNotFound />
  }

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext);
  return context;
}