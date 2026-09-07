const express = require('express');
const cors = require('cors');
const path = require('path');
const ExcelJS = require('exceljs');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Obtener catálogo de insumos (para búsqueda predictiva)
app.get('/api/insumos', (req, res) => {
    db.all("SELECT * FROM catalogo_insumos", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// 2. Guardar registros de entrada (soporta un arreglo para sync offline)
app.post('/api/entradas', (req, res) => {
    const entradas = Array.isArray(req.body) ? req.body : [req.body];
    
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        const stmt = db.prepare(`
            INSERT INTO registro_entradas 
            (id_entrada, id_insumo, cantidad, lote, fecha_caducidad, fecha_registro, semana_anio) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        for (const e of entradas) {
            stmt.run(
                e.id_entrada, 
                e.id_insumo, 
                e.cantidad, 
                e.lote, 
                e.fecha_caducidad, 
                e.fecha_registro, 
                e.semana_anio
            );
        }
        
        stmt.finalize();
        db.run("COMMIT", (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Entradas registradas correctamente', count: entradas.length });
        });
    });
});

// 3. Exportar Excel Semanal usando la plantilla CARTA PORTE 2026.xlsx
app.get('/api/exportar-semana/:semana', async (req, res) => {
    const semana = parseInt(req.params.semana);

    try {
        const rows = await new Promise((resolve, reject) => {
            const query = `
                SELECT r.*, c.nombre, c.categoria, c.unidad_medida, c.proveedor_default 
                FROM registro_entradas r
                JOIN catalogo_insumos c ON r.id_insumo = c.id_insumo
                WHERE r.semana_anio = ?
                ORDER BY r.fecha_registro ASC
            `;
            db.all(query, [semana], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const workbook = new ExcelJS.Workbook();
        const templatePath = path.resolve(__dirname, '../CARTA PORTE 2026.xlsx');
        
        // Cargar la plantilla existente
        await workbook.xlsx.readFile(templatePath);
        const worksheet = workbook.worksheets[0]; // Tomar la primera hoja

        // Agregar las filas con los datos de la base de datos.
        // NOTA: Esto asume que agregaremos los datos al final de la hoja.
        // Ajustaremos el mapeo de columnas específico después de revisar la plantilla.
        for (const row of rows) {
            worksheet.addRow([
                row.fecha_registro,
                row.nombre,
                row.cantidad,
                row.unidad_medida,
                row.lote || 'N/A',
                row.fecha_caducidad || 'N/A',
                row.proveedor_default || 'N/A'
            ]);
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=Carta_Porte_Semana_${semana}.xlsx`);
        
        await workbook.xlsx.write(res);
        res.end();
        
    } catch (error) {
        console.error("Error al exportar Excel:", error);
        res.status(500).json({ error: "Error al generar el archivo Excel" });
    }
});

// 4. Obtener entradas de una semana (para la vista de Bitácora)
app.get('/api/entradas/semana/:semana', (req, res) => {
    const semana = parseInt(req.params.semana);
    const query = `
        SELECT r.*, c.nombre, c.proveedor_default 
        FROM registro_entradas r
        JOIN catalogo_insumos c ON r.id_insumo = c.id_insumo
        WHERE r.semana_anio = ?
        ORDER BY r.fecha_registro DESC
    `;
    db.all(query, [semana], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
