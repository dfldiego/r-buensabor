const response = require('express');
const MenuDetail = require('../models/menu-details.model');

const list = async (req, res = response) => {
    let from = req.query.from || 0;
    let limit = req.query.limit || 10;

    MenuDetail.find({ status: true })
        .populate('product', 'description')
        .populate('menu', 'description')
        .skip(Number(from))
        .limit(Number(limit))
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
                    size
                });
            });
        });
}

const create = async (req, res = response) => {

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