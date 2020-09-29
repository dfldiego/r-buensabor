import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Nosotros from '../Nosotros/Nosotros';
import Testimoniales from '../Testimoniales/Testimoniales';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Nosotros />
            <Testimoniales />
        </Fragment>
    )
}

export default Home
