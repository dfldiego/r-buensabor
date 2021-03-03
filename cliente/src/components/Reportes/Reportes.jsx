import React, { Fragment, useState } from 'react';
import './Reportes.css';
// imports components
import Ranking from './Ranking';
import Recaudacion from './Recaudacion';
import PedidosClientesReportes from './PedidosClientesReportes';
import ControlStock from './ControlStock';

const Reportes = () => {

    const [rankingcomponent, setRankingComponent] = useState(false);
    const [recaudacion, setRecaudacion] = useState(false);
    const [pedidosClientesReportes, setPedidosClientesReportes] = useState(false);
    const [controlStock, setControlStock] = useState(false);

    const handleClickRanking = e => {
        e.preventDefault();

        setRecaudacion(false);
        setPedidosClientesReportes(false);
        setControlStock(false);
        setRankingComponent(true);
    }

    const handleClickRecaudacion = e => {
        e.preventDefault();

        setPedidosClientesReportes(false);
        setControlStock(false);
        setRankingComponent(false);
        setRecaudacion(true);
    }

    const handleClickPedidosClientesReportes = e => {
        e.preventDefault();

        setRecaudacion(false);
        setControlStock(false);
        setRankingComponent(false);
        setPedidosClientesReportes(true);
    }

    const handleClickControlStock = e => {
        e.preventDefault();

        setRecaudacion(false);
        setPedidosClientesReportes(false);
        setRankingComponent(false);
        setControlStock(true);
    }

    return (
        <Fragment>
            <main className="container">
                <h1 className="titulo">Reportes</h1>

                <section className="fila_reportes">
                    <section className="circulo" onClick={e => handleClickRanking(e)}>
                        <h3>Ranking Comidas Pedidas</h3>
                    </section>
                    <section className="circulo" onClick={e => handleClickRecaudacion(e)}>
                        <h3>Recaudación Diaria/Mensual</h3>
                    </section>
                    <section className="circulo" onClick={e => handleClickPedidosClientesReportes(e)}>
                        <h3>Pedidos por Cliente</h3>
                    </section>
                    <section className="circulo" onClick={e => handleClickControlStock(e)}>
                        <h3>Control de Stock</h3>
                    </section>
                </section>

                <section>
                    {rankingcomponent ?
                        <Ranking />
                        :
                        null
                    }
                    {recaudacion ?
                        <Recaudacion />
                        :
                        null
                    }
                    {pedidosClientesReportes ?
                        <PedidosClientesReportes />
                        :
                        null
                    }
                    {controlStock ?
                        <ControlStock />
                        :
                        null
                    }
                </section>
            </main>
        </Fragment>
    )
}

export default Reportes
