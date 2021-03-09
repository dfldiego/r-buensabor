const response = require('express');
const OrderDetail = require('../models/order-detail.model');
const User = require('../models/user.model');
const excelController = require('../controllers/excel.controller');

// Require library
var xl = require('excel4node');

const list = async (req, res = response) => {
    OrderDetail.find({ status: true }).exec((err, orderDetails) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        OrderDetail.countDocuments({ status: true }, (err, size) => {
            res.json({
                ok: true,
                orderDetails,
                size
            });
        });
    });
};

const create = async (req, res = response) => {
    let body = req.body;
    let orderDetail = new OrderDetail({
        quantity: body.quantity,
        subTotal: body.subTotal,
        status: body.status,
        order: body.order
    });

    orderDetail.save((err, orderDetailStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            orderDetail: orderDetailStored
        });
    });
};

const update = async (req, res = response) => {
    let id = req.params.id;

    const { product, menu } = req.body;

    OrderDetail.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, orderDetailStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            orderDetail: orderDetailStored
        });
    });
};

const remove = async (req, res = response) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    OrderDetail.findByIdAndUpdate(id, changeStatus, { new: true }, (err, detailDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!detailDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Detalle de orden no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            orderDetail: detailDeleted
        });
    });
};

const rank = async (req, res = response) => {
    //OBTENER LA FECHA INICIO DESDE EL BODY
    const initialDate = req.body.desde;
    let initialDateTimeStamp = Date.parse(initialDate);
    //OBTENER LA FECHA FIN DESDE EL BODY
    const finalDate = req.body.hasta;
    let finalDateTimeStamp = Date.parse(finalDate);

    OrderDetail.find({ status: true, menu: { $ne: null } })
        .populate('menu description')
        .populate('order orderDate')
        .exec((err, details) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            var result = [];
            /*  console.log("details", details); */

            //OBTENER LA FECHAS DE LOS PEDIDOS
            let filterOrderByDate = [];
            for (const pedido of details) {
                let orderDateTimeStamp = Date.parse(pedido.order.orderDate);

                if (orderDateTimeStamp < finalDateTimeStamp && orderDateTimeStamp > initialDateTimeStamp) {
                    filterOrderByDate.push(pedido);
                }
            }

            /*  console.log("filterOrderByDate", filterOrderByDate); */

            filterOrderByDate.reduce(function (res, value) {
                if (!res[value.menu._id]) {
                    res[value.menu._id] = { menu: value.menu._id, quantity: 0, description: value.menu.description };
                    result.push(res[value.menu._id])
                }
                res[value.menu._id].quantity += value.quantity;
                return res;
            }, {});

            const resultSort = result.sort((a, b) => b.quantity - a.quantity);

            req.body.ranking = resultSort;
            excelController.create(req, res);

            /* res.json({
                ok: true,
                result: resultSort,
                size: result.length
            }); */
        });
};

const incomesDay = async (req, res) => {

    //OBTENER LA FECHA INICIO DESDE EL BODY -- FECHA DE RECAUDACION DIARIA //enero=0
    const initialDate = new Date(2021, 01, 6);
    const dayinitialDateTimeStamp = initialDate.getDay();
    const monthInitialDateTimeStamp = initialDate.getMonth();
    const yearinitialDateTimeStamp = initialDate.getFullYear();

    OrderDetail.find({ status: true, menu: { $ne: null } })
        .populate('order orderDate')
        .exec((err, detailsIncomeDay) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            const totalDailyIncomes = filterOrderAndGetIncomes(detailsIncomeDay, yearinitialDateTimeStamp, monthInitialDateTimeStamp, dayinitialDateTimeStamp);

            res.json({
                ok: true,
                result: totalDailyIncomes.totalIncomes,
                size: totalDailyIncomes.count
            });
        });
}

const incomesMonth = async (req, res) => {

    //OBTENER LA FECHA INICIO DESDE EL BODY -- FECHA DE RECAUDACION DIARIA //enero=0
    const initialDate = new Date(2021, 01);
    const monthInitialDateTimeStamp = initialDate.getMonth();
    const yearinitialDateTimeStamp = initialDate.getFullYear();

    OrderDetail.find({ status: true, menu: { $ne: null } })
        .populate('order orderDate')
        .exec((err, detailsIncomeMonth) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            const totalMonthIncomes = filterOrderAndGetIncomes(detailsIncomeMonth, yearinitialDateTimeStamp, monthInitialDateTimeStamp, null);

            res.json({
                ok: true,
                result: totalMonthIncomes.totalIncomes,
                size: totalMonthIncomes.count
            });
        });
}

const sizeofOrdersByClient = async (req, res) => {
    //OBTENER LA FECHA INICIO DESDE EL BODY
    const FechaInicial = new Date("2021/01/23 23:30:14");
    let FechaInicialTimeStamp = Date.parse(FechaInicial);
    //OBTENER LA FECHA FIN DESDE EL BODY
    const FechaFinal = new Date("2021/02/28 23:30:14");
    let FechaFinalTimeStamp = Date.parse(FechaFinal);

    OrderDetail.find({ status: true })
        .populate('menu description')
        .populate('order orderDate')
        .exec(async (err, details) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            console.log("details");
            console.log(details);

            //OBTENER LA FECHAS DE LOS PEDIDOS
            let orderFilterByDate = [];
            for (const pedido of details) {
                let FechaPedidoTimeStamp = Date.parse(pedido.order.orderDate);

                if (FechaPedidoTimeStamp < FechaFinalTimeStamp && FechaPedidoTimeStamp > FechaInicialTimeStamp) {
                    const user = await User.findById(pedido.order.user);
                    orderFilterByDate.push({ pedido, user });
                }
            }

            console.log("orderFilterByDate");
            console.log(orderFilterByDate);

            // Ahora debo hacer un reduce q filtre por id de user de las ordenes

            const result = orderFilterByDate
                .map(function (user) { return user.user.email })
                .reduce(function (res, value) {
                    if (res[value]) {
                        res[value] = res[value] + 1;
                    } else {
                        res[value] = 1;
                    }
                    return res;
                }, {});

            res.json({
                ok: true,
                result: result,
                size: result.length,
            });
        });

}

function filterOrderAndGetIncomes(details, yearDate, monthDate, dayDate) {
    let orderFilter = [];
    let data = {
        totalIncomes: 0,
        count: 0
    }
    let orderDateTimeStamp = '';
    let dayOrderDate = '';
    let monthOrderDate = '';
    let yearOrderDate = '';

    for (const orderDetail of details) {

        orderDateTimeStamp = Date.parse(orderDetail.order.orderDate);
        if (dayDate !== null) {
            dayOrderDate = new Date(orderDateTimeStamp).getDay();
        }
        monthOrderDate = new Date(orderDateTimeStamp).getMonth();
        yearOrderDate = new Date(orderDateTimeStamp).getFullYear();

        if (dayDate !== null) {
            if (dayDate === dayOrderDate && monthDate === monthOrderDate && yearDate === yearOrderDate) {
                orderFilter.push(orderDetail);
                data.count++;
            }
        } else {
            if (monthDate === monthOrderDate && yearDate === yearOrderDate) {
                orderFilter.push(orderDetail);
                data.count++;
            }
        }
    }

    // Debemos ahora hacer un reduce de orderFilter
    data.totalIncomes = orderFilter.reduce(function (res, value) {
        return res + value.subTotal;
    }, 0);

    return data
}

module.exports = {
    list,
    create,
    update,
    remove,
    rank,
    incomesDay,
    incomesMonth,
    sizeofOrdersByClient,
}
