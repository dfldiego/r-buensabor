import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Nosotros from '../Nosotros/Nosotros';
import Testimoniales from '../Testimoniales/Testimoniales';
import DosColumnas from '../Dos-columnas/DosColumnas';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Nosotros />
            <DosColumnas />
            <Testimoniales />

        </Fragment>
    )
}

export default Home
