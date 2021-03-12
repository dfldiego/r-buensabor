const response = require('express');
const OrderDetail = require('../models/order-detail.model');
const User = require('../models/user.model');

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
    const initialDate = req.query.desde;
    let initialDateTimeStamp = Date.parse(initialDate);
    //OBTENER LA FECHA FIN DESDE EL BODY
    const finalDate = req.query.hasta;
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
            /* console.log("details", details); */

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

            const data = resultSort;

            // data in matriz
            const rows = data.map(item => [item.description, String(item.quantity)]);

            let csvData = "Descripcion, Cantidad, \n";

            for (const row of rows) {
                csvData += row.join(",");
                csvData += "\n";
            }

            console.log(csvData)

            res.set('Content-Type', 'text/csv');
            res.send(csvData);
        });
};

const incomes = async (req, res) => {
    //OBTENER LA FECHA INICIO DESDE EL BODY -- FECHA DE RECAUDACION DIARIA //enero=0
    const initialDateClient = req.query.desde;

    let initialDate = new Date(initialDateClient);
    let dayinitialDateTimeStamp = '';
    let monthInitialDateTimeStamp = '';
    let yearinitialDateTimeStamp = '';

    if (!req.query.desde) {
        dayinitialDateTimeStamp = null;
        monthInitialDateTimeStamp = req.query.month;
        yearinitialDateTimeStamp = req.query.year;
    } else {
        dayinitialDateTimeStamp = initialDate.getDate() + 1;
        monthInitialDateTimeStamp = initialDate.getMonth();
        yearinitialDateTimeStamp = initialDate.getFullYear();
    }

    OrderDetail.find({ status: true, menu: { $ne: null } })
        .populate('order orderDate')
        .populate('menu description price')
        .populate('product description price')
        .exec((err, detailsIncome) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            const totalIncomesReport = filterOrderAndGetIncomes(detailsIncome, yearinitialDateTimeStamp, monthInitialDateTimeStamp, dayinitialDateTimeStamp);

            console.log("totalIncomesReport", totalIncomesReport);
            // data in matriz
            const rows = totalIncomesReport.map(item => [item.orderDate, item.menu, item.menuPrice, item.totalIncomes]);

            let csvData = "Fecha, Descripcion, Precio, Total \n";

            for (const row of rows) {
                csvData += row.join(",");
                csvData += "\n";
            }

            console.log(csvData)

            res.set('Content-Type', 'text/csv');
            res.send(csvData);

            /*             res.json({
                            ok: true,
                            result: totalIncomesReport.totalIncomes,
                            size: totalIncomesReport.count
                        }); */
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
    let dataIncomes = {
        count: 0,
        totalIncomes: 0
    };
    let dataOrder = [];
    let orderDateTimeStamp = '';
    let dayOrderDate = '';
    let monthOrderDate = '';
    let yearOrderDate = '';

    // details have data of menu, product and orderDate of the order.
    for (const orderDetail of details) {

        orderDateTimeStamp = Date.parse(orderDetail.order.orderDate);
        if (dayDate !== null) {
            dayOrderDate = new Date(orderDateTimeStamp).getDate();
        }
        monthOrderDate = new Date(orderDateTimeStamp).getMonth();
        yearOrderDate = new Date(orderDateTimeStamp).getFullYear();

        if (dayDate !== null) {
            if (dayDate === dayOrderDate && monthDate === monthOrderDate && yearDate === yearOrderDate) {
                orderFilter.push(orderDetail);
                dataIncomes.count++;
            }
        } else {
            if (Number(monthDate) === monthOrderDate && Number(yearDate) === yearOrderDate) {
                orderFilter.push(orderDetail);
                dataIncomes.count++;
            }
        }
    }

    // Debemos ahora hacer un reduce de orderFilter
    dataIncomes.totalIncomes = orderFilter.reduce(function (res, value) {
        return res + value.subTotal;
    }, 0);
    // datos a obtener: order.orderDate - menu description(or product.description) - menu price(or product.price)
    orderFilter.map(orden => {
        let objectOrder = {};

        objectOrder.orderDate = new Date(orden.order.orderDate).toLocaleDateString();
        if (orden.menu) {
            objectOrder.menu = orden.menu.description;
            objectOrder.menuPrice = orden.menu.price;
        } else {
            objectOrder.menu = orden.product.description;
            objectOrder.menuPrice = orden.product.price;
        }
        dataOrder.push(objectOrder);
    });

    console.log("dataOrder", dataOrder);
    console.log("dataIncomes", dataIncomes);
    // join two objects: dataOrder & dataIncomes
    let data = [...dataOrder, dataIncomes];
    console.log("data", data);
    return data
}

module.exports = {
    list,
    create,
    update,
    remove,
    rank,
    incomes,
    sizeofOrdersByClient,
}
