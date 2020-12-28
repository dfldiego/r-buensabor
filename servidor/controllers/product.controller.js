const response = require('express');
const Product = require('../models/product.model');

const list = async (req, res = response) => {
    let from = req.query.from || 0;
    let limit = req.query.limit || 10;

    Product.find({ status: true })
        .skip(Number(from))
        .limit(Number(limit))
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Product.countDocuments({ status: true }, (err, size) => {
                res.json({
                    ok: true,
                    products,
                    size
                });
            });
        });
}

const create = async (req, res = response) => {

    let { description } = req.body;
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

    product.save((err, productStored) => {
        if (err) {
            return res.status(500).json({
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
            user: productStored
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

module.exports = {
    list,
    create,
    update,
    remove,
}