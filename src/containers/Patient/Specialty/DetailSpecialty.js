import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import ScheduleSpecialty from './ScheduleSpecialty';
import { Link } from 'react-router-dom';
import { createLogger } from 'redux-logger';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialty: [],
            doctorBySpe: []
        }
    }

    getDoctor = (specialty) => {
        this.props.getDoctorBySpecialty(specialty);
    }

    async componentDidMount() {
        this.props.getSpecialtyById(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.specialty !== this.props.specialty) {
            this.setState({
                specialty: this.props.specialty
            })
            this.getDoctor(this.props.specialty[0].name);
        }
        if (prevProps.doctorBySpe !== this.props.doctorBySpe) {
            this.setState({
                doctorBySpe: this.props.doctorBySpe
            })

        }

    }

    render() {
        let { specialty, doctorBySpe } = this.state;
        return (
            <div className='DetailSpecialtyPage' style={{ color: "green" }}>
                <HomeHeader />

                {specialty && specialty.length > 0 &&
                    specialty.map((item) =>
                        <div className='specialtyDetail'>{item.name}</div>
                    )
                }

                {doctorBySpe && doctorBySpe.length > 0 &&
                    doctorBySpe.map((item) =>
                        <div className='doctorDiv'>
                            <div className="doctorInfo">
                                <div className='infoDiv'>
                                    <div>
                                        <img src={Buffer.from(item.doctorId.avt, 'base64').toString('binary')} alt="" className='iii' />
                                    </div>
                                    <i className='I'><span className='SPAN'>BS</span> {item.doctorId.name}</i>
                                    <Link to={`/detailDoctor/${item.doctorId._id}`}>About</Link>
                                </div>

                            </div>
                            <div className="schedulee">
                                <ScheduleSpecialty doctorId={item.doctorId._id} dataFromParent={item} />
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        specialty: state.admin.specialty,
        doctorBySpe: state.admin.doctorBySpe
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSpecialtyById: (id) => dispatch(actions.getSpecialtyById(id)),
        getDoctorBySpecialty: (specialty) => dispatch(actions.getDoctorBySpecialty(specialty)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
