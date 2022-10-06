import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { withRouter } from 'react-router';

import img from '../../../assets/specialty/120331-co-xuong-khop.jpg';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialty: []
        }
    }

    handleViewSpecialtyDetail = (id) => {
        this.props.history.push(`/detailSpecialty/${id}`);
    }

    async componentDidMount() {
        this.props.getAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                specialty: this.props.allSpecialty
            })
        }
    }

    render() {
        let specialty = this.state.specialty;
        return (
            <div className='specialtySection'>
                <div className="specialtyContainer">
                    <div className='specialtyHeader'>
                        <span>Chuyên khoa phổ biến</span>
                        <button className='headerButton'>Xem thêm</button>
                    </div>
                    <Slider {...this.props.settings}>
                        {specialty && specialty.length > 0 &&
                            specialty.map((item) =>
                                <div className='img' onClick={() => this.handleViewSpecialtyDetail(item._id)}>
                                    <img src={Buffer.from(item.imgBase64, 'base64').toString('binary')} alt="" className='ii' />
                                    <h3>{item.name}</h3>
                                </div>
                            )
                        }
                    </Slider>
                </div>
            </div>
        );
    }

}

//redux
const mapStateToProps = state => {
    return {
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialty: () => dispatch(actions.getAllSpecialty())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
