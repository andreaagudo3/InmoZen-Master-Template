import { createContext, useContext, useEffect, useState } from 'react'
import { useThemeStore } from '../store/themeStore'
import TenantNotFound from '../pages/error/TenantNotFound'
import { resolveTenantConfig } from '../services/tenantResolver'
import { supabase } from '../services/supabaseClient'

const TenantContext = createContext(null)

const MASTER_IDENTITY = {
  id: 'master-zendo',
  slug: 'zendo',
  name: 'Zendo Master',
  isMaster: true,
  primary_color: '#2563eb',
  features: { isDemo: false }
};

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function resolve() {
      console.log("🚀 Iniciando resolución de Tenant...");

      const hostname = window.location.hostname;
      const params = new URLSearchParams(window.location.search);
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

      // 1. Resolución básica por URL
      const result = await resolveTenantConfig(hostname, params);
      let finalData = result.data;
      let finalIsMaster = result.isMaster;

      console.log("1. Resultado inicial URL:", { finalData, finalIsMaster });

      // 2. Comprobar Sesión
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        console.log("2. Usuario detectado:", session.user.id);

        // BUSCAR EN MEMBERS
        const { data: memberData, error: mErr } = await supabase
          .from('members')
          .select('tenant_id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (mErr) console.error("❌ Error en tabla members:", mErr);

        if (memberData?.tenant_id) {
          console.log("3. Tenant ID encontrado en members:", memberData.tenant_id);

          // BUSCAR EL OBJETO TENANT COMPLETO
          const { data: authTenant, error: tErr } = await supabase
            .from('tenants')
            .select('*')
            .eq('id', memberData.tenant_id)
            .single();

          if (authTenant) {
            console.log("4. Datos del Tenant recuperados:", authTenant.name);
            finalData = authTenant;
            finalIsMaster = authTenant.slug === 'zendo';
          } else {
            console.warn("⚠️ No se pudieron cargar los datos de tenants para el ID:", memberData.tenant_id, tErr);
          }
        } else {
          console.warn("⚠️ El usuario no tiene entrada en la tabla 'members'");
        }
      }

      // 3. Aplicar datos o Fallback
      if (finalData) {
        console.log("✅ Aplicando Tenant FINAL:", finalData.name);
        const tenantObject = { ...finalData, isMaster: finalIsMaster };
        setTenant(tenantObject);

        useThemeStore.getState().initFromTenant(
          finalData.theme || 'MINIMAL',
          finalData.primary_color || '#23c698',
          finalData.secondary_color || '#64748b'
        );
      } else {
        console.log("ℹ️ No se detectó tenant, aplicando MASTER_IDENTITY");
        setTenant(MASTER_IDENTITY);
      }

      setLoading(false);
    }

    resolve();
  }, []);

  if (loading && !tenant) return <div>Cargando Zendo...</div>;
  if (error && !tenant) return <TenantNotFound />;

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() { return useContext(TenantContext); }