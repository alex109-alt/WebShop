const express = require('express');
const router = express.Router('');

const productsModel = require('../models/products');

router.get('/', (req, res, next) => {
    productsModel
        .obtener()
        .then(products => {
            res.render("products/ver", {
                productos: products,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo productos");
        });

});

router.get('/agregar', (req, res, next) => {
    res.render('products/agregar');
});

router.post('/insertar', (req, res, next) => {
    // Obtener el nombre y precio. Es lo mismo que 
    //const nombre = req.body;
    //const precio = req.body;
    const {
        nombre,
        precio
    } = req.body;
    if (!nombre || !precio) {
        return res.status(500).send('No hay nombre o precio');
    }

    productsModel
        .insertar(nombre, precio)
        .then(idProductoInsertado => {
            res.redirect('/products');
        })
        .catch(err => {
            return res.status(500).send("Error insertando los datos");
        });
});

router.get('/eliminar/:id', (req, res, next) => {
    productsModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect('/products');
        })
        .catch(err => {
            return res.status(500).send("Error eliminando los datos");
        });
});

router.get('/editar/:id', (req, res, next) => {
    productsModel
    .obtenerPorId(req.params.id)
    .then(products => {
        if(products){
            res.render('products/editar', {
                productos: products,
            });
        }else{
            return res.status(500).send("No existe el producto con este id");
        }
    })
    .catch(err => {
        return res.status(500).send('Error e=obteniendo los datos');
    });
});

router.post('/actualizar/', (req, res, next) => {
    const { id, nombre, precio } = req.body;
    if(!nombre || !precio || !id){
        return res.status(500).send('No hay suficientes datos');
    }
    
    productsModel
    .actualizar(id, nombre, precio)
    .then(() => {
        res.redirect('/products');
    })
    .catch(err =>{
        return res.status(500).send('Error actualizando los datos');
    });
});

module.exports = router;