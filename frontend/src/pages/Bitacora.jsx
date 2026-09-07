import React, { useState, useEffect } from 'react';
import { Calendar, Download, Edit2, Trash2, Box } from 'lucide-react';
import { obtenerSemanaActual } from '../utils/businessLogic';
import { obtenerEntradasPorSemana, eliminarEntrada } from '../db/offlineStore';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default function Bitacora() {
  const [semana, setSemana] = useState(obtenerSemanaActual());
  const [entradas, setEntradas] = useState([]);
  const [descargando, setDescargando] = useState(false);

  const cargarEntradas = async () => {
    const data = await obtenerEntradasPorSemana(semana);
    setEntradas(data || []);
  };

  useEffect(() => {
    cargarEntradas();
  }, [semana]);

  const descargarExcel = async () => {
    if (entradas.length === 0) {
      alert("No hay movimientos registrados para descargar en esta semana.");
      return;
    }

    setDescargando(true);
    try {
      // Cargamos la plantilla estática localmente desde public/
      const response = await fetch('/CARTA_PORTE_2026.xlsx');
      if (!response.ok) throw new Error("No se pudo cargar la plantilla base de Excel.");
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0]; // Usar la primera hoja
      
      // La plantilla podría tener encabezados, si necesitas escribirlos a partir de cierta fila,
      // ajusta el índice. ExcelJS "addRow" lo pondrá al final de los datos existentes.
      for (const row of entradas) {
          worksheet.addRow([
              row.cantidad,
              row.unidad_medida || 'N/A',
              row.producto || 'N/A',
              row.lote || 'N/A',
              row.fecha_caducidad || 'N/A',
              row.proveedor || 'N/A'
          ]);
      }

      // Escribir y descargar
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Carta_Porte_Semana_${semana}.xlsx`);

    } catch (error) {
      console.error(error);
      alert("Error al generar el Excel. Asegúrate de tener la plantilla en la carpeta correcta.");
    } finally {
      setDescargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      await eliminarEntrada(id);
      cargarEntradas();
    }
  };

  const totalUnidades = entradas.reduce((acc, curr) => acc + curr.cantidad, 0);

  return (
    <div className="p-4 space-y-6 pb-24">
      
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
          {descargando ? 'Generando Excel...' : 'Descargar Excel Semanal'}
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
                <Box size={12} /> {entrada.unidad_medida || 'U.M'}
              </div>
              <div className="bg-pastel-primaryContainer text-pastel-onPrimaryContainer px-2 py-1 rounded-full text-xs font-bold">
                {entrada.cantidad} u.
              </div>
            </div>
            
            <h5 className="font-bold text-pastel-textHeading text-lg leading-tight mb-2">
              {entrada.producto || entrada.nombre || 'Producto Desconocido'}
            </h5>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-pastel-surfaceMuted text-pastel-textBody text-[10px] px-2 py-1 rounded-md font-semibold">
                Lote: {entrada.lote || 'N/A'}
              </span>
              <span className="bg-pastel-peachBg text-pastel-peachText text-[10px] px-2 py-1 rounded-md font-semibold">
                Cad: {entrada.fecha_caducidad || 'N/A'}
              </span>
              <span className="bg-pastel-secondaryContainer text-pastel-onSecondaryContainer text-[10px] px-2 py-1 rounded-md font-semibold">
                Prov: {entrada.proveedor || 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between items-end pt-2 border-t border-pastel-border">
              <p className="text-[10px] text-pastel-textMuted font-medium">
                {new Date(entrada.fecha_registro).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button onClick={() => handleEliminar(entrada.id_entrada)} className="p-2 bg-pastel-surfaceMuted rounded-lg text-pastel-textMuted hover:text-red-500">
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
