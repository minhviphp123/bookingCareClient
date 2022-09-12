import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import * as actions from "../../../store/actions";
import Slider from 'react-slick';

import img from '../../../assets/doctor/doctor.jpg'

class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }

    async componentDidMount() {
        this.props.getTopDoctor(6);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors
            })
        }
    }

    render() {
        let doctors = this.state.doctors;
        console.log(doctors);
        return (
            <div className='specialtySection'>
                <div className="specialtyContainer">
                    <div className='specialtyHeader'>
                        <span>Bác sĩ nổi bật trog tuần</span>
                        <button className='headerButton'>Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        {/* <div className='imgg'>
                            <div className='subBlock'>
                                <img src={img} alt="" className='iii' />
                                <h3>Bác sĩ</h3>
                            </div>
                        </div> */}
                        {doctors && doctors.map((item) =>
                            <div className='imgg' key={item.password}>
                                <div className='subBlock'>
                                    <img src={Buffer.from(item.avt, 'base64').toString('binary')} alt="" className='iii' />
                                    <h3>{item.name}</h3>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        doctors: state.admin.doctors,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: () => dispatch(actions.getTopDoctor(6))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
