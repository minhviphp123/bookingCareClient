import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Home from '../../routes/Home';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import Doctor from './Section/Doctor.js';
import Handbook from './Section/Handbook';
import './HomePage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {

    render() {

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <Doctor settings={settings} />
                <Handbook settings={settings} />
                <div style={{ height: '200px' }}></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
