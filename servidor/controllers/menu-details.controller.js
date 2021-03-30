const response = require('express');
const MenuDetail = require('../models/menu-details.model');

const list = async (req, res = response) => {

    MenuDetail.find({ status: true })
        .populate('product', 'description current_stock')
        .populate('menu', 'description')
        .exec((err, menudetails) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            MenuDetail.countDocuments({ status: true }, (err, size) => {
                res.json({
                    ok: true,
                    menudetails,
                    err,
                    size
                });
            });
        });
}

const create = async (req, res = response) => {
    const { product, menu } = req.body;

    try {

        const existeDetalleMenu = await MenuDetail.findOne({ product, menu });
        if (existeDetalleMenu) {
            if (existeDetalleMenu.status === true) {
                return res.status(400).json({
                    ok: false,
                    msg: "ese detalle de menu ya se encuentra registrado"
                });
            } else {
                const menuDetail = new MenuDetail(req.body);
                menuDetail._id = existeDetalleMenu._id;

                const menuDetailStored = await MenuDetail.findByIdAndUpdate(menuDetail._id, menuDetail, { new: true });

                return res.json({
                    ok: true,
                    msg: "detalle de menu dado de alta nuevamente",
                    menuDetailStored
                });
            }
        }


        let menudetail = new MenuDetail(req.body);

        menudetail.save((err, menudetailStored) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                menudetail: menudetailStored
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err,
            msg: "Error inesperado. Hable con el admin."
        });
    }
}

const update = async (req, res = response) => {
    let id = req.params.id;

    MenuDetail.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, menudetailStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            menudetail: menudetailStored
        });
    });
}

const remove = async (req, res = response) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    MenuDetail.findByIdAndUpdate(id, changeStatus, { new: true }, (err, menudetailDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!menudetailDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Detalle del menu no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            msg: "Producto Eliminado",
            menudetail: menudetailDeleted,
        });
    });
}

module.exports = {
    list,
    create,
    update,
    remove,
}