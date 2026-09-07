const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'almacen.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Inicializar tablas
db.serialize(() => {
    // Catálogo de Insumos
    db.run(`CREATE TABLE IF NOT EXISTS catalogo_insumos (
        id_insumo TEXT PRIMARY KEY,
        nombre TEXT NOT NULL,
        categoria TEXT NOT NULL CHECK(categoria IN ('SABOR_COLOR', 'MATERIA_PRIMA')),
        unidad_medida TEXT NOT NULL,
        proveedor_default TEXT
    )`);

    // Registro de Entradas
    db.run(`CREATE TABLE IF NOT EXISTS registro_entradas (
        id_entrada TEXT PRIMARY KEY,
        id_insumo TEXT NOT NULL,
        producto TEXT,
        cantidad REAL NOT NULL,
        unidad_medida TEXT,
        proveedor TEXT,
        lote TEXT,
        fecha_caducidad TEXT,
        fecha_registro TEXT NOT NULL,
        semana_anio INTEGER NOT NULL
    )`);

    // Intentar agregar las columnas nuevas por si la base de datos ya existía
    db.run("ALTER TABLE registro_entradas ADD COLUMN unidad_medida TEXT", (err) => {});
    db.run("ALTER TABLE registro_entradas ADD COLUMN proveedor TEXT", (err) => {});
    db.run("ALTER TABLE registro_entradas ADD COLUMN producto TEXT", (err) => {});

    // Opcional: Insertar datos de prueba en catálogo si está vacío
    db.get("SELECT COUNT(*) AS count FROM catalogo_insumos", (err, row) => {
        if (!err && row.count === 0) {
            const stmt = db.prepare("INSERT INTO catalogo_insumos VALUES (?, ?, ?, ?, ?)");
            stmt.run('uuid-1', 'Resina Epóxica Industrial 5L', 'MATERIA_PRIMA', 'Piezas / Pzas', 'Distribuidora Logística Norte S.A.');
            stmt.run('uuid-2', 'Saborizante Fresa', 'SABOR_COLOR', 'Litros', 'SaborTech Inc.');
            stmt.run('uuid-3', 'Cintas de Sellado Reforzadas', 'MATERIA_PRIMA', 'Rollos', 'Empaques & Cintas');
            stmt.finalize();
            console.log('Catálogo de insumos inicializado con datos de prueba.');
        }
    });
});

module.exports = db;
