import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detailDoctor/${doctor._id}`);
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
                            <div className='imgg' key={item.password} onClick={() => this.handleViewDetailDoctor(item)}>
                                <div className='subBlock'>
                                    <img src={Buffer.from(item.avt, 'base64').toString('binary')} alt="" className='iii' />
                                    <h3>{item.role},{item.name}</h3>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));