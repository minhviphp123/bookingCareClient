import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';

import Slider from 'react-slick';

import img from '../../../assets/medFacility/114348-bv-viet-duc.jpg'

class MedicalFacility extends Component {

    render() {

        return (
            <div className='specialtySection'>
                <div className="specialtyContainer">
                    <div className='specialtyHeader'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button className='headerButton'>Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Bệnh viện...</h3>
                        </div>
                        <div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Bệnh viện...</h3>
                        </div>
                        <div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Bệnh viện...</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Bệnh viện...</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Bệnh viện...</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Bệnh viện...</h3>
                        </div>
                    </Slider>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
