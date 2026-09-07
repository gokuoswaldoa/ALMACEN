import Dexie from 'dexie';

export const db = new Dexie('AlmacenDelgadoDB');

// Definimos el esquema de la base de datos local
db.version(1).stores({
    entradasPendientes: 'id_entrada, id_insumo, cantidad, lote, fecha_caducidad, fecha_registro, semana_anio'
});

// Función para guardar localmente
export async function guardarEntradaLocal(entrada) {
    try {
        await db.entradasPendientes.add(entrada);
        console.log('Entrada guardada localmente (offline)');
    } catch (error) {
        console.error('Error al guardar localmente:', error);
    }
}

// Función para sincronizar con el backend
export async function sincronizarEntradas() {
    const pendientes = await db.entradasPendientes.toArray();
    
    if (pendientes.length === 0) return 0; // No hay nada que sincronizar

    try {
        const response = await fetch('http://localhost:3001/api/entradas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pendientes)
        });

        if (response.ok) {
            // Si el servidor confirma, limpiamos IndexedDB
            await db.entradasPendientes.clear();
            console.log(`${pendientes.length} entradas sincronizadas con el servidor.`);
            return pendientes.length;
        } else {
            console.error('El servidor rechazó la sincronización');
            return 0;
        }
    } catch (error) {
        console.warn('Servidor inaccesible. Sincronización pospuesta.', error);
        return 0;
    }
}
