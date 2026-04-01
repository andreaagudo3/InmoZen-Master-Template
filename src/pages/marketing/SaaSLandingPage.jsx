import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * SaaSLandingPage — The B2B marketing landing for InmoZen.
 * Features: Hero section, Features grid, and simple Pricing.
 */
export default function SaaSLandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8 border border-blue-100 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {t('marketing.hero.badge', 'Listas en solo 7 días')}
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-slate-950 mb-8 leading-[1.1]">
            Webs inmobiliarias de <br className="hidden md:block" />
            <span className="text-blue-600">alto rendimiento</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('marketing.hero.subtitle', 'Sin la lentitud de WordPress. Tecnología React + Supabase para inmobiliarias que quieren vender más y rápido.')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-blue-200/50 transform hover:-translate-y-1">
              {t('marketing.hero.cta_primary', 'Empezar ahora')}
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-sm">
              {t('marketing.hero.cta_secondary', 'Ver planes')}
            </button>
          </div>
          
          <div className="mt-20 relative max-w-6xl mx-auto">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(8,112,184,0.12)] overflow-hidden">
               <div className="bg-slate-50 rounded-2xl aspect-[16/10] md:aspect-[21/9] flex items-center justify-center border border-slate-100 overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200" 
                    alt="Modern Real Estate Interface" 
                    className="w-full h-full object-cover opacity-90 transition-transform hover:scale-105 duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Por qué InmoZen ── */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: 'Velocidad Rayo',
                desc: 'Carga en menos de 1s. Google amará tu web y tus clientes no esperarán.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                color: 'blue'
              },
              {
                title: 'Panel "Para Humanos"',
                desc: 'Olvídate de WordPress. Nuestro panel es tan fácil como Instagram.',
                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                color: 'indigo'
              },
              {
                title: 'Arquitectura Moderna',
                desc: 'React 19 + Supabase. La tecnología de Silicon Valley en tu negocio.',
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
                color: 'purple'
              },
              {
                title: 'En 7 días Vendes',
                desc: 'El lunes empezamos, el domingo tienes tu web volando.',
                icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                color: 'green'
              }
            ].map((arg, i) => (
              <div key={i} className="group">
                <div className={`w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-slate-100 text-${arg.color}-600`}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arg.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{arg.title}</h3>
                <p className="text-slate-600 leading-relaxed">{arg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6">Planes adaptados a tu escala</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Elige el paquete que mejor se adapte a tus necesidades actuales.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* PLAN ARRANQUE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">ARRANQUE</h3>
              <p className="text-slate-500 mb-6">Para agentes independientes.</p>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-slate-950">590€</span>
                <span className="text-slate-500 text-sm font-medium ml-2">Setup único</span>
              </div>
              <div className="mb-8">
                <span className="text-2xl font-bold text-slate-950">29€</span>
                <span className="text-slate-500 text-sm">/mes mantenimiento</span>
              </div>
              <ul className="space-y-4 mb-10 text-sm">
                {[
                  'Hasta 20 propiedades',
                  'Web SPA Ultrarrápida',
                  'Filtros Básicos (Precio/Tipo)',
                  'Formulario de leads',
                  'Panel Admin Básico',
                  'Entrega en 7 días'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 px-6 border-2 border-slate-900 text-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all">Seleccionar Plan</button>
            </div>

            {/* PLAN PROFESIONAL */}
            <div className="bg-slate-950 rounded-3xl p-8 shadow-2xl relative lg:-translate-y-4 border-4 border-blue-500">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest leading-relaxed">Más vendido ⭐</div>
              <h3 className="text-2xl font-bold text-white mb-2">PROFESIONAL</h3>
              <p className="text-slate-400 mb-6">Crecimiento sin límites.</p>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-white">950€</span>
                <span className="text-slate-400 text-sm font-medium ml-2">Setup único</span>
              </div>
              <div className="mb-8">
                <span className="text-2xl font-bold text-white">45€</span>
                <span className="text-slate-400 text-sm">/mes mantenimiento</span>
              </div>
              <ul className="space-y-4 mb-10 text-sm">
                {[
                  'Propiedades Ilimitadas',
                  'Filtros Avanzados (m2, habs)',
                  'Gestión de Localidades',
                  'SEO Automático (Slugs)',
                  'Idiomas (ES/EN)',
                  'Propiedades Destacadas',
                  'Entrega 7-10 días'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">Impulsar mi Inmobiliaria</button>
            </div>

            {/* PLAN ELITE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">ELITE</h3>
              <p className="text-slate-500 mb-6">Dominio total del mercado.</p>
              <div className="mb-2">
                <span className="text-4xl font-extrabold text-slate-950">1.450€</span>
                <span className="text-slate-500 text-sm font-medium ml-2">Setup único</span>
              </div>
              <div className="mb-8">
                <span className="text-2xl font-bold text-slate-950">79€</span>
                <span className="text-slate-500 text-sm">/mes mantenimiento</span>
              </div>
              <ul className="space-y-4 mb-10 text-sm">
                {[
                  'Mapa de Google Maps Int.',
                  'Traducción IA (4 idiomas)',
                  'Blog / Sección de Noticias',
                  'Exportación CSV/Excel',
                  'Gestión Total + Leads',
                  'Estrategia SEO Local',
                  'Entrega 15 días'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 px-6 border-2 border-slate-900 text-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all">Contactar con Ventas</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Servicios Extra ── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Servicios Extra (Upselling)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Migración de Datos', price: '200€', desc: 'Carga masiva XLM/Excel' },
              { name: 'Botón WhatsApp Pro', price: '90€', desc: 'Chat con mensaje pers.' },
              { name: 'Pack SEO Local', price: '150€', desc: 'GMB + Reseñas' },
              { name: 'Gestión Dominio', price: '30€/año', desc: 'Configuración y renovación' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">{s.name}</h4>
                <p className="text-blue-600 font-bold mb-2">Desde {s.price}</p>
                <p className="text-xs text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-32 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">¿Listo para transformar tu inmobiliaria?</h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed">Únete a la nueva era digital con InmoZen. Tu web estará volando en menos de una semana.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-12 py-6 bg-white text-slate-950 rounded-2xl font-bold text-2xl hover:bg-slate-100 transition-all shadow-2xl hover:scale-105">
              Crear mi cuenta ahora
            </button>
            <a href="tel:+34900000000" className="text-white font-medium hover:text-blue-400 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Hablar con un experto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
