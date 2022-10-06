import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './MedicalFacility.scss';
import { withRouter } from 'react-router';
import Slider from 'react-slick';

import img from '../../../assets/medFacility/114348-bv-viet-duc.jpg'

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinics: []
        }
    }

    handleViewClinic = (id) => {
        this.props.history.push(`/detailClinic/${id}`);
    }

    async componentDidMount() {
        this.props.getAllClinic();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.clinics !== this.props.clinics) {
            this.setState({
                clinics: this.props.clinics
            })
        }
    }

    render() {
        let clinics = this.state.clinics;
        return (
            <div className='specialtySection'>
                <div className="specialtyContainer">
                    <div className='specialtyHeader'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button className='headerButton'>Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        {clinics && clinics.length > 0 &&
                            clinics.map((item, index) =>
                                <div className='img' key={index} onClick={() => this.handleViewClinic(item._id)}>
                                    <img src={Buffer.from(item.img, 'base64').toString('binary')} alt="" className='ii' />
                                    <h3>{item.name}</h3>
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
        clinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinic: () => dispatch(actions.getAllClinic())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
