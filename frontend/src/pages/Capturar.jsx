import React, { useState, useEffect } from 'react';
import { UserCircle, Search, Minus, Plus, CheckCircle, Package } from 'lucide-react';
import { generarDatosLote, obtenerSemanaActual } from '../utils/businessLogic';
import { guardarEntradaLocal, sincronizarEntradas } from '../db/offlineStore';

export default function Capturar() {
  const [cantidad, setCantidad] = useState(0);
  const [insumos, setInsumos] = useState([]);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  
  const [lote, setLote] = useState('');
  const [caducidad, setCaducidad] = useState('');

  // Simulando carga inicial del backend
  useEffect(() => {
    // Al cargar, intentar sincronizar pendientes
    sincronizarEntradas();

    // Cargar catálogo de insumos (Mock local si falla el backend)
    fetch('http://localhost:3001/api/insumos')
      .then(res => res.json())
      .then(data => setInsumos(data.data || []))
      .catch(err => {
        console.warn("Backend no disponible, usando datos offline");
        setInsumos([
          { id_insumo: '1', nombre: 'Resina Epóxica Industrial 5L', categoria: 'MATERIA_PRIMA', unidad_medida: 'Pzas', proveedor_default: 'Logística S.A.' },
          { id_insumo: '2', nombre: 'Saborizante Fresa', categoria: 'SABOR_COLOR', unidad_medida: 'Litros', proveedor_default: 'SaborTech' }
        ]);
      });
  }, []);

  const handleSelectInsumo = (insumo) => {
    setInsumoSeleccionado(insumo);
    
    // Aplicar regla de negocio
    const datos = generarDatosLote(insumo.categoria);
    setLote(datos.lote);
    setCaducidad(datos.caducidad);
  };

  const guardarEntrada = async () => {
    if (!insumoSeleccionado || cantidad <= 0 || !lote || !caducidad) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    const nuevaEntrada = {
      id_entrada: crypto.randomUUID(),
      id_insumo: insumoSeleccionado.id_insumo,
      cantidad: cantidad,
      lote: lote,
      fecha_caducidad: caducidad,
      fecha_registro: new Date().toISOString(),
      semana_anio: obtenerSemanaActual()
    };

    // Guardar offline por defecto (garantiza rapidez)
    await guardarEntradaLocal(nuevaEntrada);
    alert("¡Entrada registrada con éxito!");

    // Intentar sincronizar al servidor de inmediato
    sincronizarEntradas();

    // Limpiar formulario
    setCantidad(0);
    setInsumoSeleccionado(null);
    setLote('');
    setCaducidad('');
  };

  return (
    <div className="p-4 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-pastel-primary uppercase tracking-wider">ALMACÉN DELGADO</p>
          <h1 className="text-2xl font-bold text-pastel-textHeading">Capturar</h1>
        </div>
        <div className="bg-pastel-primary text-white p-2 rounded-full">
          <UserCircle size={24} />
        </div>
      </div>

      {/* Greeting Card */}
      <div className="bg-pastel-surface border border-pastel-border p-4 rounded-xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-pastel-primaryContainer text-pastel-onPrimaryContainer p-2 rounded-lg">
            <Package size={20} />
          </div>
          <div>
            <p className="text-[10px] text-pastel-textMuted uppercase font-semibold">Control de Entrada</p>
            <h2 className="text-lg font-bold text-pastel-textHeading">¡Hola, Ing. Gabriela!</h2>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-pastel-primaryContainer text-pastel-onPrimaryContainer px-2 py-1 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 bg-pastel-primary rounded-full"></div>
          Online
        </div>
      </div>

      {/* Selector de Producto */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-pastel-textMuted uppercase tracking-wider flex justify-between">
          <span>Producto / SKU</span>
          <span className="text-pastel-primary">Búsqueda predictiva</span>
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pastel-textMuted" size={20} />
          <select 
            className="w-full bg-pastel-surfaceMuted border-none rounded-xl py-4 pl-10 pr-4 text-pastel-textHeading font-semibold focus:ring-2 focus:ring-pastel-primary appearance-none"
            onChange={(e) => handleSelectInsumo(insumos.find(i => i.id_insumo === e.target.value))}
            value={insumoSeleccionado?.id_insumo || ""}
          >
            <option value="" disabled>Selecciona o escanea un insumo...</option>
            {insumos.map(i => (
              <option key={i.id_insumo} value={i.id_insumo}>{i.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stepper Cantidad */}
      <div className="space-y-2 bg-pastel-surface border border-pastel-border p-4 rounded-xl shadow-sm">
        <label className="text-xs font-bold text-pastel-textMuted uppercase tracking-wider flex justify-between">
          <span>Cantidad a Recibir</span>
        </label>
        <div className="flex items-center justify-between gap-4 mt-2">
          <button 
            onClick={() => setCantidad(Math.max(0, cantidad - 1))}
            className="w-[52px] h-[52px] bg-pastel-secondaryContainer text-pastel-onSecondaryContainer rounded-xl flex items-center justify-center font-bold text-xl active:scale-95 transition-transform"
          >
            <Minus size={24} />
          </button>
          
          <div className="flex-1 bg-pastel-bg h-[52px] rounded-xl border border-pastel-border flex items-center justify-center">
            <span className="text-3xl font-bold text-pastel-textHeading tabular-nums">{cantidad}</span>
          </div>

          <button 
            onClick={() => setCantidad(cantidad + 1)}
            className="w-[52px] h-[52px] bg-pastel-primary text-white rounded-xl flex items-center justify-center font-bold text-xl active:scale-95 transition-transform shadow-md shadow-pastel-primary/30"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* Lote y Caducidad */}
      <div className="space-y-2 p-4 bg-pastel-secondaryContainer/20 border border-pastel-secondaryContainer/40 rounded-xl">
        <label className="text-xs font-bold text-pastel-secondary uppercase tracking-wider flex justify-between">
          <span>Trazabilidad & Lote</span>
          <span className="text-[10px]">Autocompletado inteligente</span>
        </label>
        
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <label className="text-[10px] text-pastel-textMuted font-semibold">Lote</label>
            <input 
              type="text" 
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              className="w-full bg-pastel-surface border border-pastel-border rounded-lg p-2 font-bold text-pastel-textHeading"
              placeholder="Ej. 241026"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-pastel-textMuted font-semibold">Caducidad</label>
            <input 
              type="text" 
              value={caducidad}
              onChange={(e) => setCaducidad(e.target.value)}
              className="w-full bg-pastel-surface border border-pastel-border rounded-lg p-2 font-bold text-pastel-textHeading"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={guardarEntrada}
        className="w-full h-[56px] bg-pastel-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-float active:scale-[0.98] transition-transform"
      >
        <CheckCircle size={24} />
        Guardar Entrada
      </button>

    </div>
  );
}
