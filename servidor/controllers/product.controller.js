const response = require('express');
const Product = require('../models/product.model');

const list = async (req, res = response) => {

    try {
        const [products, total] = await Promise.all([
            Product.find({ status: true })
                .populate('category', 'description'),
            Product.countDocuments({ status: true })
        ]);
        res.json({
            ok: true,
            products,
            total,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
}

const create = async (req, res = response) => {

    const { description } = req.body;

    try {
        const existeDescription = await Product.findOne({ description });
        if (existeDescription) {
            if (existeDescription.status === true) {
                return res.status(400).json({
                    ok: false,
                    msg: "ese producto ya se encuentra registrado"
                });
            } else {
                const product = new Product(req.body);
                product._id = existeDescription._id;

                const productStored = await Product.findByIdAndUpdate(product._id, product, { new: true });

                return res.json({
                    ok: true,
                    msg: "producto dado de alta nuevamente",
                    productStored
                });
            }
        }

        let product = new Product(req.body);

        const productStored = await product.save();

        res.json({
            ok: true,
            product: productStored
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err,
        });
    }
}

const update = async (req, res = response) => {
    let id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, productStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productStored
        });
    });
}

const remove = async (req, res = response) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    Product.findByIdAndUpdate(id, changeStatus, { new: true }, (err, productDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            msg: "Producto Eliminado",
            product: productDeleted,
        });
    });
}

//CONTROL DE STOCK. MOSTRAR ARTICULOS POR DEBAJO DEL STOCK MINIMO
const scarse = async (req, res = response) => {
    let scarseProducts = [];
    let rows = [];
    try {
        const products = await Product.find({ status: true });
        console.log(products);

        for (let product of products) {
            if (product.current_stock < product.min_stock) {
                scarseProducts.push(product);
            }
        }

        if (scarseProducts === []) {
            console.log("No hay insumos escasos");
        }

        rows = scarseProducts.map(function (item) {
            return [item.description, item.min_stock, item.current_stock]
        });

        let csvData = "Descripcion Producto, Stock mínimo, Stock actual \n";

        for (const row of rows) {
            csvData += row.join(",");
            csvData += "\n";
        }

        res.set('Content-Type', 'text/csv');
        res.send(csvData);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const search = async (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    let search = req.params.words;
    let regExWords = new RegExp(search, 'i');

    let conditionSearch = {
        status: true
    }

    if (search != 'undefined') {
        conditionSearch = {
            description: regExWords,
            status: true
        }
    }

    try {
        const [products, total] = await Promise.all([
            Product.find(conditionSearch)
                .populate('category', 'description')
                .skip(from)
                .limit(limit),
            Product.countDocuments(conditionSearch)
        ]);

        res.json({
            ok: true,
            products,
            total,
            limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const getById = async (req, res) => {
    let productId = req.params.id;

    Product.findById(productId).exec((err, product) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: err
            });
        }

        res.json({
            ok: true,
            product
        });
    });
};

module.exports = {
    list,
    create,
    update,
    remove,
    search,
    getById,
    scarse,
}