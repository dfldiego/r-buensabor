const response = require('express');
const Order = require('../models/order.model');
const OrderDetail = require('../models/order-detail.model');
const MenuDetail = require('../models/menu-details.model');
const Product = require('../models/product.model');

const list = async (req, res = response) => {
    let status = req.params.status;
    let filterStatus = {};
    if (status != undefined) {
        filterStatus = {
            status
        }
    }

    try {
        // buscar ordenes por estados.
        let orders = await Order.find(filterStatus);

        // recorro las ordenes de un estado en especifico.
        for (let order of orders) {

            // obtengo los detalles de la orden 
            const orderDetails = await OrderDetail.find({
                order: order._id
            });

            // seteo los detalles a la orden
            order.details = orderDetails;
        }

        Order.countDocuments({ status }).exec((err, size) => {
            res.json({
                ok: true,
                orders,
                size
            });
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
}

const create = async (req, res = response) => {
    let body = req.body;

    try {
        // recorre todas las camidas del pedido
        for (const food of body.foods) {
            //obtengo los detalles de la comida del pedido
            const menuDetailData = await MenuDetail.find({ menu: food.id })
                .populate('menu', 'description')
                .populate('product', ['description', 'current_stock']);

            // recorro los detalles de la comida del pedido
            for (const menuDetail of menuDetailData) {
                //cantidad = cantidad de producto en el menu * cantidad de la misma comida pedida.
                let quantity = menuDetail.quantity * food.quantity;

                // si la cantidad necesaria para producir el producto es menor al que hay-> enviar error
                if (quantity > menuDetail.product.current_stock) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            msg: 'No hay stock disponible para ' + menuDetail.menu.description
                        }
                    });
                }
            }
        }

        // recorro las bebidas del pedido
        for (const drink of body.drinks) {
            // obtengo la bebida desde producto de la bd
            const productData = await Product.findOne({ _id: drink.id });

            // si la cantidad de bebida pedida es mayor que la bebida en stock -> error.
            if (drink.quantity > productData.current_stock) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No hay stock disponible para ' + productData.description
                    }
                });
            }
        }

        let order = new Order({
            orderDate: body.orderDate,
            endDate: 'calcular',
            number: body.number,
            shippingType: body.shippingType,
            user: body.user
        });

        // crear la orden en BD
        order.save((err, orderStored) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            // crear detalle de orden para los menus
            for (let food of body.foods) {
                saveOrderDetail(orderStored._id, food, true);
            }

            // crear detalle de orden para los insumos(bebidas)
            for (let drink of body.drinks) {
                saveOrderDetail(orderStored._id, drink, false);
            }

            return res.json({
                ok: true,
                order: orderStored
            });
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
}

function saveOrderDetail(orderId, detail, flag) {
    let orderDetail = new OrderDetail({
        quantity: detail.quantity,
        subTotal: detail.subTotal,
        status: true,
        order: orderId
    });
    flag ? orderDetail.menu = detail.id : orderDetail.product = detail.id;
    orderDetail.save();
}

const update = async (req, res = response) => {
    const id = req.params.id;

    // obtengo estado de la orden desde el cliente
    const status = req.body.status;

    if (status === 'TERMINADO') {
        //busco y obtengo detalles de la orden desde la BD
        const orderDetails = await OrderDetail.find({ order: id })
            .populate('product', 'current_stock');

        //recorro cada detalle de los detalles de la orden
        for (let detail of orderDetails) {

            // si el detalle de la orden es de una bebida
            if (detail.product != null) {
                let drink = detail.product;

                // stock actual = stock actual del producto - cant. del detalle
                drink.current_stock = drink.current_stock - detail.quantity;
                drink.save();
            } else if (detail.menu != null) {
                const menuDetails = await MenuDetail.find({ menu: detail.menu })
                    .populate('product', 'current_stock');
                for (let menu of menuDetails) {
                    let food = menu.product;
                    food.current_stock = food.current_stock - (detail.quantity * menu.quantity);
                    food.save();
                }
            }
        }
    }

    Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }, (err, orderStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            order: orderStored
        });
    });
}

const remove = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "remove"
    })
}

const search = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "search"
    })
}

module.exports = {
    list,
    create,
    update,
    remove,
    search,
}