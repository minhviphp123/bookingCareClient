import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import img from '../../../assets/handbook/handbook.jpg';

class Handbook extends Component {

    render() {

        return (
            <div className='specialtySection'>
                <div className="specialtyContainer">
                    <div className='specialtyHeader'>
                        <span>Cẩm nang</span>
                        <button className='headerButton'>Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        <div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Cẩm nang 1</h3>
                        </div>
                        <div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Cẩm nang 1</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Cẩm nang 1</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Cẩm nang 1</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Cẩm nang 1</h3>
                        </div><div className='img'>
                            <img src={img} alt="" className='ii' />
                            <h3>Cẩm nang 1</h3>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }

}

//redux
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
