const response = require('express');
const OrderDetail = require('../models/order-detail.model');

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

const rank = async (req, res) => {
    //OBTENER LA FECHA INICIO DESDE EL BODY
    const FechaInicial = new Date("2021/02/23 23:30:14");
    let FechaInicialTimeStamp = Date.parse(FechaInicial);
    //OBTENER LA FECHA FIN DESDE EL BODY
    const FechaFinal = new Date("2021/02/26 23:30:14");
    let FechaFinalTimeStamp = Date.parse(FechaFinal);

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
            console.log("details");
            console.log(details);

            //OBTENER LA FECHAS DE LOS PEDIDOS
            let pedidosFiltradosPorFechas = [];
            let contador = 0;
            for (const pedido of details) {
                let FechaPedidoTimeStamp = Date.parse(pedido.order.orderDate);

                if (FechaPedidoTimeStamp < FechaFinalTimeStamp && FechaPedidoTimeStamp > FechaInicialTimeStamp) {
                    pedidosFiltradosPorFechas.push(pedido);
                    contador++;
                }
            }

            console.log("pedidosFiltradosPorFechas");
            console.log(pedidosFiltradosPorFechas);
            console.log(contador);

            // Debemos ahora hacer un reduce de pedidosFiltradosPorFechas

            pedidosFiltradosPorFechas.reduce(function (res, value) {
                if (!res[value.menu._id]) {
                    res[value.menu._id] = { menu: value.menu._id, quantity: 0, description: value.menu.description };
                    result.push(res[value.menu._id])
                }
                res[value.menu._id].quantity += value.quantity;
                return res;
            }, {});

            res.json({
                ok: true,
                result: result.sort((a, b) => b.quantity - a.quantity),
                size: result.length
            });
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
}
