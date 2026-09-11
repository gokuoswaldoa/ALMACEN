import React from 'react';
import { ShieldAlert } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 sm:p-6">
      
      {/* Tarjeta Flotante Corporativa */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-down">
        
        {/* Encabezado Rojo */}
        <div className="bg-red-600 p-8 sm:p-10 flex items-center justify-center relative overflow-hidden">
          {/* Efecto de luz sutil en el fondo rojo */}
          <div className="absolute inset-0 bg-red-500 opacity-20"></div>
          <ShieldAlert size={80} className="text-white relative z-10 drop-shadow-xl" />
        </div>

        {/* Cuerpo del Mensaje */}
        <div className="p-8 sm:p-10 text-center">
          
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 uppercase tracking-wider">
            Servicio Interrumpido
          </h1>
          
          {/* Línea separadora elegante */}
          <div className="w-16 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-700 text-lg sm:text-xl font-medium leading-relaxed mb-8">
            Esta aplicación ha sido suspendida por <span className="font-bold text-gray-900">Oswaldo</span> debido a falta de interés.
          </p>

          {/* Pie de página con aspecto técnico/seguridad */}
          <div className="pt-5 border-t border-gray-100 flex flex-col gap-1.5 text-[11px] sm:text-xs text-gray-400 font-mono tracking-widest uppercase">
            <span>ERR_CODE: 403_FORBIDDEN</span>
            <span>ACCESO DE USUARIO: DENEGADO</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
