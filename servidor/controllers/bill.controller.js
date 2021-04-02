const Bill = require('../models/bill.model');
const pdfController = require('../controllers/pdf-generator.controller');
const Order = require('../models/order.model');

const list = async (req, res) => {
    Bill.find({ status: true }).exec((err, bills) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Bill.countDocuments({ status: true }, (err, size) => {
            res.json({
                ok: true,
                bills,
                size
            });
        });
    });
};

const create = async (req, res) => {
    try {
        let body = req.body;
        const billNumber = `${body.order}-${new Date().getMilliseconds()}`;
        let bill = new Bill({
            date: body.date,
            number: billNumber,
            discount: body.discount,
            total: body.total,
            paymentType: body.paymentType,
            nroCard: body.nroCard,
            status: true,
            order: body.order
        });

        bill.save((err, billStored) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                bill: billStored
            });
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
};

const update = async (req, res) => {
    let id = req.params.id;

    const orderById = await Order.findById(req.body.order)
        .populate("user", "name email telephoneNumber");

    Bill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, billStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (orderById.status === "FACTURADO") {
            req.body.billNumber = req.body.number;
            req.body.clientEmail = orderById.user.email;
            pdfController.create(req, res);
        }

        /* res.json({
            ok: true,
            bill: billStored
        }); */
    });
};

const remove = async (req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    Bill.findByIdAndUpdate(id, changeStatus, { new: true }, (err, billDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!billDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Bill not found'
                }
            });
        }

        res.json({
            ok: true,
            bill: billDeleted
        });
    });
};

module.exports = {
    list,
    create,
    update,
    remove
}