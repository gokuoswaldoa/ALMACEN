import React, { useState, useEffect } from 'react';
import { UserCircle, Search, Minus, Plus, CheckCircle, Package } from 'lucide-react';
import { generarDatosLote, obtenerSemanaActual } from '../utils/businessLogic';
import { guardarEntradaLocal, sincronizarEntradas } from '../db/offlineStore';

export default function Capturar() {
  const [cantidad, setCantidad] = useState(0);
  const [insumos, setInsumos] = useState([]);
  
  const [productoTexto, setProductoTexto] = useState('');
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);
  const [categoria, setCategoria] = useState('MATERIA_PRIMA'); // Por defecto químico
  
  const [unidadMedida, setUnidadMedida] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [lote, setLote] = useState('');
  const [caducidad, setCaducidad] = useState('');

  const [mostrarToast, setMostrarToast] = useState(false);

  useEffect(() => {
    sincronizarEntradas();

    async function load() {
      try {
        const data = await import('../db/offlineStore').then(m => m.obtenerInsumos());
        setInsumos(data);
      } catch(err) {
        console.error(err);
      }
    }
    load();
  }, []);

  // Efecto para autocompletar lote/caducidad si la categoría cambia a SABOR_COLOR
  useEffect(() => {
    if (categoria === 'SABOR_COLOR') {
      const datos = generarDatosLote('SABOR_COLOR');
      if (!lote) setLote(datos.lote);
      if (!caducidad) setCaducidad(datos.caducidad);
    }
  }, [categoria]);

  const handleProductoChange = (e) => {
    const texto = e.target.value;
    setProductoTexto(texto);

    const match = insumos.find(i => i.nombre.toLowerCase() === texto.toLowerCase());
    
    if (match) {
      setInsumoSeleccionado(match);
      setCategoria(match.categoria);
      setUnidadMedida(match.unidad_medida || '');
      setProveedor(match.proveedor_default || '');

      const datos = generarDatosLote(match.categoria);
      setLote(match.categoria === 'SABOR_COLOR' ? datos.lote : '');
      setCaducidad(match.categoria === 'SABOR_COLOR' ? datos.caducidad : '');
    } else {
      setInsumoSeleccionado(null);
    }
  };

  const guardarEntrada = async () => {
    if (!productoTexto || cantidad <= 0) {
      alert("Por favor ingresa un producto y una cantidad válida.");
      return;
    }

    if (categoria === 'MATERIA_PRIMA' && (!lote || !caducidad)) {
      alert("Para productos químicos, debes ingresar manualmente el Lote y Caducidad del proveedor.");
      return;
    }

    const nuevaEntrada = {
      id_entrada: crypto.randomUUID(),
      id_insumo: insumoSeleccionado ? insumoSeleccionado.id_insumo : 'MANUAL_' + Date.now(),
      producto: productoTexto,
      cantidad: cantidad,
      unidad_medida: unidadMedida || 'No especificada',
      proveedor: proveedor || 'No especificado',
      lote: lote || '',
      fecha_caducidad: caducidad || '',
      fecha_registro: new Date().toISOString(),
      semana_anio: obtenerSemanaActual()
    };

    await guardarEntradaLocal(nuevaEntrada);
    
    // Mostrar Toast
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);

    setCantidad(0);
    setProductoTexto('');
    setInsumoSeleccionado(null);
    setUnidadMedida('');
    setProveedor('');
    setLote('');
    setCaducidad('');
    setCategoria('MATERIA_PRIMA');
  };

  return (
    <div className="p-4 space-y-6 pb-24 relative">
      
      {/* Toast Animado */}
      {mostrarToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-2 font-bold">
            <CheckCircle size={20} />
            <span>¡Registro guardado con éxito!</span>
          </div>
        </div>
      )}

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

      {/* Input de Producto con Autocompletado Nativo */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-pastel-textMuted uppercase tracking-wider flex justify-between">
          <span>Materia Prima o Producto</span>
          <span className="text-[10px] text-pastel-primary">Libre o Selección</span>
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pastel-textMuted" size={20} />
          <input 
            type="text"
            list="insumos-list"
            value={productoTexto}
            onChange={handleProductoChange}
            placeholder="Escribe o selecciona un producto..."
            className="w-full bg-pastel-surfaceMuted border-none rounded-xl py-4 pl-10 pr-4 text-pastel-textHeading font-semibold focus:ring-2 focus:ring-pastel-primary appearance-none"
          />
          <datalist id="insumos-list">
            {insumos.map(i => (
              <option key={i.id_insumo} value={i.nombre} />
            ))}
          </datalist>
        </div>
        
        {/* Toggle Categoría */}
        <div className="flex bg-pastel-surfaceMuted p-1 rounded-lg mt-2">
          <button 
            onClick={() => setCategoria('MATERIA_PRIMA')}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${categoria === 'MATERIA_PRIMA' ? 'bg-white shadow-sm text-pastel-textHeading' : 'text-pastel-textMuted'}`}
          >
            Químico (Manual)
          </button>
          <button 
            onClick={() => setCategoria('SABOR_COLOR')}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${categoria === 'SABOR_COLOR' ? 'bg-white shadow-sm text-pastel-textHeading' : 'text-pastel-textMuted'}`}
          >
            Sabor/Color (Auto)
          </button>
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

      {/* Detalles de Operación (U.M. y Proveedor) */}
      <div className="space-y-2 p-4 bg-pastel-surfaceMuted border border-pastel-border rounded-xl">
        <label className="text-xs font-bold text-pastel-textMuted uppercase tracking-wider flex justify-between">
          <span>Detalles de Operación</span>
          <span className="text-[10px] text-pastel-primary">Auto-completado (editable)</span>
        </label>
        
        <div className="space-y-3 mt-2">
          <div>
            <label className="text-[10px] text-pastel-textMuted font-semibold">Unidad de Medida</label>
            <input 
              type="text" 
              value={unidadMedida}
              onChange={(e) => setUnidadMedida(e.target.value)}
              className="w-full bg-pastel-surface border border-pastel-border rounded-lg p-2 font-bold text-pastel-textHeading focus:ring-1 focus:ring-pastel-primary outline-none"
              placeholder="Ej. Kg, Litros, Pzas"
            />
          </div>
          <div>
            <label className="text-[10px] text-pastel-textMuted font-semibold">Proveedor</label>
            <input 
              type="text" 
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              className="w-full bg-pastel-surface border border-pastel-border rounded-lg p-2 font-bold text-pastel-textHeading focus:ring-1 focus:ring-pastel-primary outline-none"
              placeholder="Nombre del proveedor"
            />
          </div>
        </div>
      </div>

      {/* Lote y Caducidad */}
      <div className={`space-y-2 p-4 rounded-xl transition-colors border ${categoria === 'SABOR_COLOR' ? 'bg-pastel-secondaryContainer/20 border-pastel-secondaryContainer/40' : 'bg-pastel-surface border-pastel-border'}`}>
        <label className="text-xs font-bold text-pastel-secondary uppercase tracking-wider flex justify-between">
          <span>Trazabilidad & Lote</span>
          <span className="text-[10px] text-pastel-textMuted">{categoria === 'SABOR_COLOR' ? 'Autocompletado' : 'Obligatorio por proveedor'}</span>
        </label>
        
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <label className="text-[10px] text-pastel-textMuted font-semibold">Lote {categoria === 'SABOR_COLOR' ? '(Editable)' : ''}</label>
            <input 
              type="text" 
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              className="w-full bg-white border border-pastel-border rounded-lg p-2 font-bold text-pastel-textHeading focus:ring-1 focus:ring-pastel-primary outline-none"
              placeholder="Ej. 241026"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-pastel-textMuted font-semibold">Caducidad {categoria === 'SABOR_COLOR' ? '(Editable)' : ''}</label>
            <input 
              type="text" 
              value={caducidad}
              onChange={(e) => setCaducidad(e.target.value)}
              className="w-full bg-white border border-pastel-border rounded-lg p-2 font-bold text-pastel-textHeading focus:ring-1 focus:ring-pastel-primary outline-none"
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
