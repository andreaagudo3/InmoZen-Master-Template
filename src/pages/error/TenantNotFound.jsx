import React from 'react';

/**
 * TenantNotFound — Página 404 especializada para cuando un subdominio
 * o dominio personalizado no existe en la base de datos de Zendo.
 */
export default function TenantNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Agencia No Encontrada</h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Parece que la inmobiliaria a la que intentas acceder no está registrada en nuestra plataforma o el dominio es incorrecto.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="https://zendoapp.com"
            className="block w-full py-4 px-6 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            Ir a Zendo Home
          </a>
          <p className="text-sm text-slate-400 font-medium">
            ¿Eres el dueño? Contacta con soporte@zendoapp.com
          </p>
        </div>
      </div>
    </div>
  );
}
