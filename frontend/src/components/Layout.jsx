import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { DownloadCloud, Receipt } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-pastel-bg text-pastel-textBody font-sans pb-[80px]">
      
      {/* Contenido Principal */}
      <main className="flex-1 w-full max-w-md mx-auto bg-pastel-surface shadow-card relative">
        <Outlet />
      </main>

      {/* Fixed Footer & Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 bg-pastel-surface border-t border-pastel-border shadow-float z-50 rounded-t-xl">
        
        {/* Leyenda Especial */}
        <div className="text-center py-1 bg-pastel-surfaceMuted">
          <p className="text-[10px] text-pastel-textMuted flex items-center justify-center gap-1">
             para la ing Gabriela con mucho cariño del Desarrollador de software Oswaldo D.
          </p>
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-around items-center h-[60px] pb-2">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              \`flex flex-col items-center justify-center w-full h-full space-y-1 \${
                isActive ? 'text-pastel-primary' : 'text-pastel-textMuted'
              }\`
            }
          >
            <DownloadCloud size={24} />
            <span className="text-[11px] font-semibold">Capturar</span>
          </NavLink>
          
          <NavLink 
            to="/bitacora" 
            className={({isActive}) => 
              \`flex flex-col items-center justify-center w-full h-full space-y-1 \${
                isActive ? 'text-pastel-primary' : 'text-pastel-textMuted'
              }\`
            }
          >
            <Receipt size={24} />
            <span className="text-[11px] font-semibold">Bitácora</span>
          </NavLink>
        </nav>
      </div>

    </div>
  );
}
