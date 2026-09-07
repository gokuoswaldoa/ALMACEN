import Dexie from 'dexie';

export const db = new Dexie('AlmacenDelgadoDB');

// Definimos el esquema de la base de datos local
db.version(2).stores({
    entradasPendientes: 'id_entrada, id_insumo, producto, cantidad, unidad_medida, proveedor, lote, fecha_caducidad, fecha_registro, semana_anio',
    catalogoInsumos: 'id_insumo, nombre, categoria, unidad_medida, proveedor_default'
});

// Semilla inicial para el catálogo si está vacío
db.on('populate', async () => {
    await db.catalogoInsumos.bulkAdd([
        { id_insumo: '1', nombre: 'Resina Epóxica Industrial 5L', categoria: 'MATERIA_PRIMA', unidad_medida: 'Piezas / Pzas', proveedor_default: 'Distribuidora Logística Norte S.A.' },
        { id_insumo: '2', nombre: 'Saborizante Fresa', categoria: 'SABOR_COLOR', unidad_medida: 'Litros', proveedor_default: 'SaborTech Inc.' },
        { id_insumo: '3', nombre: 'Cintas de Sellado Reforzadas', categoria: 'MATERIA_PRIMA', unidad_medida: 'Rollos', proveedor_default: 'Empaques & Cintas' }
    ]);
});

// Guardar localmente
export async function guardarEntradaLocal(entrada) {
    try {
        await db.entradasPendientes.add(entrada);
        
        // Si el producto no está en el catálogo, agregarlo para futuros autocompletados
        const existe = await db.catalogoInsumos.get({ nombre: entrada.producto });
        if (!existe) {
            await db.catalogoInsumos.add({
                id_insumo: 'manual_' + Date.now(),
                nombre: entrada.producto,
                categoria: 'MATERIA_PRIMA',
                unidad_medida: entrada.unidad_medida,
                proveedor_default: entrada.proveedor
            });
        }
    } catch (error) {
        console.error('Error al guardar localmente:', error);
        throw error;
    }
}

export async function obtenerInsumos() {
    return await db.catalogoInsumos.toArray();
}

export async function obtenerEntradasPorSemana(semana) {
    return await db.entradasPendientes.where('semana_anio').equals(semana).reverse().sortBy('fecha_registro');
}

export async function eliminarEntrada(id_entrada) {
    await db.entradasPendientes.delete(id_entrada);
}

// Dummy para evitar errores si otras partes la llamaban
export async function sincronizarEntradas() {
    return 0;
}
