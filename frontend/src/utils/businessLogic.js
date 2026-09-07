/**
 * Lógica para calcular Lote y Caducidad según la categoría
 */
export function generarDatosLote(categoria) {
    if (categoria === 'SABOR_COLOR') {
        const hoy = new Date();
        
        // Formato Lote: DDMMYY
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const anio2Digitos = String(hoy.getFullYear()).slice(-2);
        const loteCalculado = `${dia}${mes}${anio2Digitos}`;
        
        // Formato Caducidad: DD/MM/YYYY (+1 año)
        const anioCaducidad = hoy.getFullYear() + 1;
        const caducidadCalculada = `${dia}/${mes}/${anioCaducidad}`;

        return { lote: loteCalculado, caducidad: caducidadCalculada, editable: true };
    }
    
    // MATERIA_PRIMA (Vacio y obligatorio)
    return { lote: '', caducidad: '', editable: true };
}

/**
 * Obtener número de semana del año
 */
export function obtenerSemanaActual() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
}
