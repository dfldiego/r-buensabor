const response = require('express');
const Product = require('../models/product.model');

const list = async (req, res = response) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    try {
        const [products, total] = await Promise.all([
            Product.find({ status: true })
                .populate('category', 'description')
                .skip(from)
                .limit(limit),
            Product.countDocuments({ status: true })
        ]);
        res.json({
            ok: true,
            products,
            total,
            limit,
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

const search = async (req, res) => {

    let search = req.params.words;
    let regExWords = new RegExp(search, 'i');

    Product.find({ $and: [{ description: regExWords }, { status: true }] })
        .populate('category', 'description')
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

module.exports = {
    list,
    create,
    update,
    remove,
    search,
}