import React, { useState, useEffect } from 'react';
import { Calendar, Download, Edit2, Trash2, Box, Droplets } from 'lucide-react';
import { obtenerSemanaActual } from '../utils/businessLogic';

export default function Bitacora() {
  const [semana, setSemana] = useState(obtenerSemanaActual());
  const [entradas, setEntradas] = useState([]);
  const [descargando, setDescargando] = useState(false);

  useEffect(() => {
    // Fetch desde el backend local
    fetch(`http://localhost:3001/api/entradas/semana/${semana}`)
      .then(res => res.json())
      .then(data => setEntradas(data.data || []))
      .catch(err => console.error("Error al cargar historial", err));
  }, [semana]);

  const descargarExcel = async () => {
    setDescargando(true);
    try {
      const response = await fetch(`http://localhost:3001/api/exportar-semana/${semana}`);
      if (!response.ok) throw new Error("Error en descarga");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Carta_Porte_Semana_${semana}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert("Error al descargar el Excel. Asegúrate que el servidor esté corriendo.");
    } finally {
      setDescargando(false);
    }
  };

  const totalUnidades = entradas.reduce((acc, curr) => acc + curr.cantidad, 0);

  return (
    <div className="p-4 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-pastel-primary uppercase tracking-wider">ALMACÉN DELGADO</p>
          <h1 className="text-2xl font-bold text-pastel-textHeading">Bitácora</h1>
        </div>
        <div className="bg-pastel-surfaceMuted text-pastel-primary p-2 rounded-full border border-pastel-border">
          <Calendar size={24} />
        </div>
      </div>

      {/* Week Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setSemana(obtenerSemanaActual())}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${semana === obtenerSemanaActual() ? 'bg-pastel-primary text-white' : 'bg-pastel-surfaceMuted text-pastel-textMuted'}`}
        >
          Semana Actual (Sem {obtenerSemanaActual()})
        </button>
        <button 
          onClick={() => setSemana(obtenerSemanaActual() - 1)}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${semana === obtenerSemanaActual() - 1 ? 'bg-pastel-primary text-white' : 'bg-pastel-surfaceMuted text-pastel-textMuted'}`}
        >
          Semana Anterior (Sem {obtenerSemanaActual() - 1})
        </button>
      </div>

      {/* Export Card */}
      <div className="bg-pastel-surface border border-pastel-border p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-pastel-textHeading">Exportación Semanal</h3>
            <p className="text-xs text-pastel-textMuted">Consolidado de recepción</p>
          </div>
          <div className="bg-pastel-primaryContainer text-pastel-onPrimaryContainer px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            .XLSX LISTO
          </div>
        </div>
        
        <button 
          onClick={descargarExcel}
          disabled={descargando}
          className="w-full h-[48px] bg-pastel-primaryContainer text-pastel-onPrimaryContainer rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Download size={20} />
          {descargando ? 'Generando...' : 'Descargar Excel Semanal'}
        </button>
      </div>

      {/* Lista de Movimientos */}
      <div className="space-y-4">
        <h4 className="font-bold text-sm text-pastel-textHeading flex justify-between">
          Movimientos Registrados
          <span className="text-pastel-textMuted font-normal">{entradas.length} Entradas • {totalUnidades} u.</span>
        </h4>

        {entradas.map(entrada => (
          <div key={entrada.id_entrada} className="bg-pastel-surface border border-pastel-border p-4 rounded-xl shadow-sm">
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-pastel-secondary">
                <Box size={12} /> QUÍMICOS / MP
              </div>
              <div className="bg-pastel-primaryContainer text-pastel-onPrimaryContainer px-2 py-1 rounded-full text-xs font-bold">
                {entrada.cantidad} u.
              </div>
            </div>
            
            <h5 className="font-bold text-pastel-textHeading text-lg leading-tight mb-2">
              {entrada.producto || entrada.nombre}
            </h5>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-pastel-surfaceMuted text-pastel-textBody text-xs px-2 py-1 rounded-md font-semibold">
                Lote: {entrada.lote || 'N/A'}
              </span>
              <span className="bg-pastel-peachBg text-pastel-peachText text-xs px-2 py-1 rounded-md font-semibold">
                Cad: {entrada.fecha_caducidad || 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between items-end pt-2 border-t border-pastel-border">
              <p className="text-[10px] text-pastel-textMuted font-medium">
                {new Date(entrada.fecha_registro).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button className="p-2 bg-pastel-surfaceMuted rounded-lg text-pastel-textMuted hover:text-pastel-primary">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 bg-pastel-surfaceMuted rounded-lg text-pastel-textMuted hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}

        {entradas.length === 0 && (
          <div className="text-center py-8 text-pastel-textMuted text-sm">
            No hay movimientos en esta semana.
          </div>
        )}

      </div>
    </div>
  );
}
