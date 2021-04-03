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
        .populate("order", "orderDate status")
        .exec((err, details) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            var result = [];

            //OBTENER LA FECHAS DE LOS PEDIDOS
            let filterOrderByDate = [];
            for (const pedido of details) {
                let orderDateTimeStamp = Date.parse(pedido.order.orderDate);

                if (orderDateTimeStamp < finalDateTimeStamp && orderDateTimeStamp > initialDateTimeStamp) {
                    filterOrderByDate.push(pedido);
                }
            }

            // sin tener en cuenta a los pedidos 'cancelados'
            filterOrderByDate.reduce(function (res, value) {
                if (value.order.status != 'CANCELADO') {
                    if (!res[value.menu._id]) {
                        res[value.menu._id] = { menu: value.menu._id, quantity: 0, description: value.menu.description };
                        result.push(res[value.menu._id])
                    }
                    res[value.menu._id].quantity += value.quantity;
                }
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

    // sin tener en cuenta a los pedidos 'cancelados'
    /**OrderDetail.find({ status: true, menu: { $ne: null } }) */
    OrderDetail.find({ status: true })
        .populate("order", "orderDate status shippingType")
        .populate("menu", "description price")
        .populate("product", "description price")
        .exec((err, detailsIncome) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            const totalIncomesReport = filterOrderAndGetIncomes(detailsIncome, yearinitialDateTimeStamp, monthInitialDateTimeStamp, dayinitialDateTimeStamp);

            // data in matriz
            const rows = totalIncomesReport.map(item => [item.orderDate, item.menu, item.menuPrice, item.totalIncomes]);

            let csvData = "Fecha, Descripcion, Precio, Total \n";

            for (const row of rows) {
                csvData += row.join(",");
                csvData += "\n";
            }

            res.set('Content-Type', 'text/csv');
            res.send(csvData);
        });
}

const sizeofOrdersByClient = async (req, res) => {
    //OBTENER LA FECHA INICIO DESDE EL BODY -- FECHA DE RECAUDACION DIARIA //enero=0
    const initialDateClient = req.query.desde;

    let initialDate = new Date(initialDateClient);
    let dayinitialDateTimeStamp = '';
    let monthInitialDateTimeStamp = '';
    let yearinitialDateTimeStamp = '';
    let orderDateTimeStamp = '';
    let dayOrderDate = '';
    let monthOrderDate = '';
    let yearOrderDate = '';

    if (!req.query.desde) {
        dayinitialDateTimeStamp = null;
        monthInitialDateTimeStamp = req.query.month;
        yearinitialDateTimeStamp = req.query.year;
    } else {
        dayinitialDateTimeStamp = initialDate.getDate() + 1;
        monthInitialDateTimeStamp = initialDate.getMonth();
        yearinitialDateTimeStamp = initialDate.getFullYear();
    }

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

            let orderFilterByDate = [];
            //get date of the orders
            for (const orderDetail of details) {

                orderDateTimeStamp = Date.parse(orderDetail.order.orderDate);

                // catch day, month & year of orderDate
                if (dayinitialDateTimeStamp !== null) {
                    dayOrderDate = new Date(orderDateTimeStamp).getDate();
                }
                monthOrderDate = new Date(orderDateTimeStamp).getMonth();
                yearOrderDate = new Date(orderDateTimeStamp).getFullYear();

                if (dayinitialDateTimeStamp !== null) {
                    if (dayinitialDateTimeStamp === dayOrderDate && monthInitialDateTimeStamp === monthOrderDate && yearinitialDateTimeStamp === yearOrderDate) {
                        const user = await User.findById(orderDetail.order.user);
                        orderFilterByDate.push({ orderDetail, user });
                    }
                } else {
                    if (Number(monthInitialDateTimeStamp) === monthOrderDate && Number(yearinitialDateTimeStamp) === yearOrderDate) {
                        const user = await User.findById(orderDetail.order.user);
                        orderFilterByDate.push({ orderDetail, user });
                    }
                }
            }

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

            const data = Object.entries(result);
            const rows = data.map(item => [Object.values(item)[0], Object.values(item)[1]]);

            let csvData = "Email, Total Pedidos \n";

            for (const row of rows) {
                csvData += row.join(",");
                csvData += "\n";
            }

            res.set('Content-Type', 'text/csv');
            res.send(csvData);

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

    // date filter
    // details have data of menu, product and orderDate of the order.
    for (const orderDetail of details) {
        if (orderDetail.order.status !== 'CANCELADO') {
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
    }

    // ordenes filtradas por fecha

    // Debemos ahora hacer un reduce de orderFilter
    // aqui debemos hacer el proceso para calcular el total de recaudacion
    dataIncomes.totalIncomes = orderFilter.reduce(function (res, value) {
        if (value.order.shippingType === 1) {
            value.subTotal = value.subTotal - value.subTotal * 0.1;
            return res + value.subTotal;
        }
        return res + value.subTotal;
    }, 0);
    // datos a obtener: order.orderDate - menu description(or product.description) - menu price(or product.price)
    orderFilter.map(orden => {
        let objectOrder = {};

        objectOrder.orderDate = new Date(orden.order.orderDate).toLocaleDateString();
        if (orden.menu) {
            objectOrder.menu = orden.menu.description;
            if (orden.order.shippingType === 1) {
                objectOrder.menuPrice = orden.menu.price - orden.menu.price * 0.1;
            }else{
                objectOrder.menuPrice = orden.menu.price;
            }
        } else {
            objectOrder.menu = orden.product.description;
            if (orden.order.shippingType === 1) {
                objectOrder.menuPrice = orden.product.price - orden.product.price * 0.1;
            } else {
                objectOrder.menuPrice = orden.product.price;
            }
        }
        dataOrder.push(objectOrder);
    });

    // join two objects: dataOrder & dataIncomes
    let data = [dataIncomes, ...dataOrder];
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
