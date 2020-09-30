import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Nosotros from '../Nosotros/Nosotros';
import Testimoniales from '../Testimoniales/Testimoniales';
import DosColumnas from '../Dos-columnas/DosColumnas';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Nosotros />
            <DosColumnas />
            <Testimoniales />
            <Footer />
        </Fragment>
    )
}

export default Home
