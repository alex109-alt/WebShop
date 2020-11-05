const dbConnection = require('../config/dbConnection');

module.exports = {
    insertar(nombre, precio) {
        return new Promise((resolve, reject) => {
            dbConnection.query('INSERT INTO productos (nombre, precio) VALUES(?, ?)', [nombre, precio], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },

    obtener() {
        return new Promise((resolve, rejecs) => {
            dbConnection.query('SELECT id, nombre, precio FROM productos', (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT id, nombre, precio FROM productos WHERE id = ?', [id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0]);
                });
        });
    },
    actualizar(id, nombre, precio) {
        return new Promise((resolve, reject) => {
            dbConnection.query(`update productos
            set nombre = ?,
            precio = ?
            where id = ?`,
                [nombre, precio, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM productos WHERE id = ?',
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    }
}
