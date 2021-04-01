import React, { Fragment, useState, useEffect } from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import './Carrito.css';

//Actions de Redux
import {
    abrirModalCarritoAction,
    eliminarProductoCarritoAction,
    crearNuevaOrdenAction,
} from '../../actions/homeActions';
import {
    obtenerConfiguracionAction,
    obtenerPedidosAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const Carrito = () => {

    const [totales, setTotales] = useState({
        subtotal: "0",
        total: "0",
        discount: "0",
    });
    const { subTotal, total, discount } = totales;


    const [pedido, setPedido] = useState({
        shippingType: "0",
        paymentType: null,
        nroCard: 0,
    });
    let { shippingType, paymentType, nroCard } = pedido;

    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const cerrar_modal_carrito = estadoCarrito => dispatch(abrirModalCarritoAction(estadoCarrito));
    const eliminarProductoCarrito = datosProductoCarrito => dispatch(eliminarProductoCarritoAction(datosProductoCarrito));
    const crearNuevaOrdenDePedido = (datosOrden, bill) => dispatch(crearNuevaOrdenAction(datosOrden, bill));
    const cargarPedidos = () => dispatch(obtenerPedidosAction());
    const obtenerCantidadCocineros = () => dispatch(obtenerConfiguracionAction());

    let CerrarModalCarrito = useSelector(state => state.home.abrir_modal_carrito);
    let MenusDeCarrito = useSelector(state => state.home.carrito);
    let mensaje = useSelector(state => state.home.mensaje);
    let alerta = useSelector(state => state.home.alerta);
    const pedidos_state = useSelector(state => state.admin.pedidos);
    const datoConfiguracion = useSelector(state => state.admin.configuracion);

    const cerrar_modal = () => {
        if (CerrarModalCarrito) {
            CerrarModalCarrito = false;
            cerrar_modal_carrito(CerrarModalCarrito);
        }
        return;
    }

    useEffect(() => {
        cargarPedidos();
        obtenerCantidadCocineros();

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let subtotalCarrito = 0;
        let totalCarrito = 0;
        let discountCarrito = 0;

        for (const menu of MenusDeCarrito) {
            subtotalCarrito += Number(menu.price);
        }

        if (shippingType === "1") {
            discountCarrito = (subtotalCarrito * 0.1);
            totalCarrito = subtotalCarrito - discountCarrito;
        } else {
            totalCarrito = subtotalCarrito;

            setPedido({
                ...pedido,
                paymentType: null,
            })
        }

        setTotales({
            ...totales,
            total: String(totalCarrito),
            subTotal: String(subtotalCarrito),
            discount: String(discountCarrito),
        });

        // eslint-disable-next-line
    }, [MenusDeCarrito, pedido.shippingType])

    const handleClickQuitarDelCarrito = datosProductoCarrito => {
        eliminarProductoCarrito(datosProductoCarrito);
    }

    const handleChangePedido = e => {
        setPedido({
            ...pedido,
            [e.target.name]: e.target.value
        })
    }

    const handleClickConfirmar = (MenusDeCarrito) => {
        let foods = [];
        let drinks = [];
        let contadorTiempoEstimado = 0;

        if (shippingType !== "0" && shippingType !== "1") {
            setError("Debe ingresar una forma de envío correcta");
        } else {
            setError(null);
        }

        if (shippingType !== "0" && paymentType === null) {
            setError("Debe ingresar una forma de pago correcta");
        } else {
            setError(null);
        }

        const groups = MenusDeCarrito.reduce((groups, item) => ({
            ...groups,
            [item._id]: [...(groups[item._id] || []), item]
        }), {});

        for (let orderID in groups) {
            for (const order of groups[orderID]) {
                if (order.current_stock !== undefined) { // esto es para bebidas
                    if (drinks.findIndex(item => item.id === orderID) < 0) {
                        drinks.push({
                            id: orderID,
                            quantity: groups[orderID].length,
                            subTotal: order.price * groups[orderID].length
                        });
                    }
                } else {
                    if (foods.findIndex(item => item.id === orderID) < 0) {
                        foods.push({
                            id: orderID,
                            quantity: groups[orderID].length,
                            subTotal: order.price * groups[orderID].length
                        });
                    }
                }
            }
        }

        let orderDate = new Date().toISOString();
        let number = Math.floor(Math.random() * 100000000);
        const user = JSON.parse(localStorage.getItem("user"));

        for (const elementoCarrito of MenusDeCarrito) {
            if (elementoCarrito.finished_time) {
                contadorTiempoEstimado += elementoCarrito.finished_time / datoConfiguracion.quantityCooks;
            }
        }

        //Por Delivery
        if (shippingType === "0") {
            contadorTiempoEstimado += 10;
        }

        for (const pedido of pedidos_state) {
            if (pedido.status === "EN_PROGRESO") {
                contadorTiempoEstimado += Number.parseInt(pedido.endDate) / datoConfiguracion.quantityCooks;
            }
        }

        const order = {
            orderDate,
            number,
            shippingType: Number.parseInt(shippingType),
            user: user._id,
            endDate: contadorTiempoEstimado,
            foods,
            drinks,
        }

        if (paymentType === "0") {
            paymentType = "DEBIT"
        } else if (paymentType === "1") {
            paymentType = "CREDIT"
        } else {
            paymentType = "CASH"
        }

        const bill = {
            date: orderDate,
            number,
            discount,
            total,
            paymentType,
            nroCard
        }

        crearNuevaOrdenDePedido(order, bill);
    }

    return (
        <Fragment>
            <div className="modal-carrito">
                <div className="modal-container-carrito">
                    <div className="form-container-carrito">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        {
                            MenusDeCarrito.length === 0 ?
                                <h1 className="tituloCarrito">No hay productos en el carrito</h1>
                                :
                                <div>
                                    <div className="tablaCarrito">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Sub-Total</th>
                                                    <th>Acciones</th>
                                                </tr>
                                                {
                                                    MenusDeCarrito.map((menu, index) => (
                                                        <tr key={index}>
                                                            <td className="cart_info">
                                                                <img
                                                                    src={menu.current_stock !== undefined ?
                                                                        `http://localhost:4000/api/image/products/${menu.img}` :
                                                                        `http://localhost:4000/api/image/menus/${menu.img}`}
                                                                    alt="imagen producto"
                                                                    width="150px"
                                                                />
                                                                <p>{menu.description}</p>
                                                            </td>
                                                            <td>{menu.price}</td>
                                                            <td className="boton_quitar_carrito">
                                                                <button
                                                                    href="#"
                                                                    onClick={() => handleClickQuitarDelCarrito(menu)}
                                                                >Quitar</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="total-price">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td className="total">Sub-Total</td>
                                                    <td className="total">${subTotal}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tablaCarrito">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Forma de Envio:</td>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="shippingType"
                                                            value="0"
                                                            checked={shippingType === "0"}
                                                            onChange={handleChangePedido}
                                                        />Por Delivery
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="shippingType"
                                                            value="1"
                                                            checked={shippingType === "1"}
                                                            onChange={handleChangePedido}
                                                        />Por Local
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        shippingType === "1" ?
                                            <div className="tablaCarrito">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Forma de Pago:</td>
                                                            <td>
                                                                <input
                                                                    type="radio"
                                                                    name="paymentType"
                                                                    value="0"
                                                                    checked={paymentType === "0"}
                                                                    onChange={handleChangePedido}
                                                                />Tarjeta de Débito
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="radio"
                                                                    name="paymentType"
                                                                    value="1"
                                                                    checked={paymentType === "1"}
                                                                    onChange={handleChangePedido}
                                                                />Tarjeta de Crédito
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="radio"
                                                                    name="paymentType"
                                                                    value="2"
                                                                    checked={paymentType === "2"}
                                                                    onChange={handleChangePedido}
                                                                />Efectivo
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            : null
                                    }
                                    {
                                        paymentType === "0" || paymentType === "1" ?
                                            <div className="tablaCarrito">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>N° de Tarjeta:</td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    name="nroCard"
                                                                    value={nroCard}
                                                                    onChange={handleChangePedido}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            : null
                                    }
                                    <div className="total-price">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td className="total">Total</td>
                                                    <td className="total">${total}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {
                                        error ? <p className="error">{error}</p> : null
                                    }
                                    {
                                        alerta ? <p className="error">{mensaje}</p> : null
                                    }
                                    <div className="botones_carrito">
                                        <button
                                            type="submit"
                                            className="btn_carrito"
                                            onClick={() => handleClickConfirmar(MenusDeCarrito)}
                                        >Confirmar</button>
                                        <button
                                            type="submit"
                                            onClick={cerrar_modal}
                                            className="btn_carrito"
                                        >Cancelar</button>
                                    </div>

                                </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Carrito
