import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManagePatient.scss';
import moment from 'moment';
import * as actions from "../../../store/actions";
import RemedyModal from './RemedyModal';
// import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from "react-toastify";
import { dateFormat } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            allDays: [],
            userInFo: {},
            patientByDoctor: [],
            isOpenRemedyModal: false,
            dataModal: {}
        }
    }

    setDayArr = () => {
        let allDays = [];
        for (let i = 0; i < 10; i++) {
            let object = {};
            if (i == 0) {
                object.label = 'Today - ' + moment(new Date()).add(i, 'days').format('DD/MM/20YY');
            } else {
                object.label = moment(new Date()).add(i, 'days').format('DD/MM/20YY');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        return allDays;
    }

    getTimeDidMount = () => {
        let dayArr = this.setDayArr();
        let date = moment(dayArr[0].label, 'DD.MM.YYYY').toISOString();
        let doctorId = this.props.userInFo._id;
        this.props.getPatientByDoctor(doctorId, date);
    }

    onchangeSelect = (e) => {
        let selectedDate = '';
        if (e.target.value.length > 10) {
            console.log((e.target.value).slice(7, (e.target.value.length)));
            selectedDate = moment((e.target.value).slice(7, (e.target.value.length)), 'DD.MM.YYYY').toISOString();
        }
        selectedDate = moment(e.target.value, 'DD.MM.YYYY').toISOString();
        this.setState({
            currentDate: selectedDate
        })
        let payload = {}
        if (this.props.userInFo != {} && this.props.userInFo != undefined) {
            payload = {
                doctorId: this.props.userInFo._id,
                date: selectedDate
            }
        }
        this.props.getPatientByDoctor(payload.doctorId, payload.date);

        console.log(moment((document.querySelector('.select').value).slice(7, (e.target.value.length)), 'DD.MM.YYYY').toISOString());
    }

    handleConfirm = (item) => {
        let data = {
            patientId: item._id,
            doctorId: item.doctorId,
            patientName: item.name,
            email: item.email
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenRemedyModal: false
        })
    }

    reFetchBookingDB = () => {
        let date = moment(document.querySelector('.select').value, 'DD.MM.YYYY').toISOString();
        console.log(date);
        this.props.getPatientByDoctor(this.props.userInFo._id, date);
    }

    componentDidMount = () => {
        let dayArr = this.setDayArr();
        this.setState({
            allDays: dayArr
        })
        this.getTimeDidMount();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.patientByDoctor !== this.props.patientByDoctor) {
            this.setState({
                patientByDoctor: this.props.patientByDoctor
            })
        }
    }


    render() {
        let { allDays, patientByDoctor, isOpenRemedyModal, dataModal } = this.state;
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        Manage Patient
                    </div>
                    <div className='col-3'
                        style={{
                            margin: "5px auto",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <select name="" id="" onChange={this.onchangeSelect} className='select'>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) =>
                                    <option key={index} value={item.label}>{item.label}</option>)}
                        </select>
                    </div>
                    <div className="col-12">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </tr>
                            {/* <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr> */}
                            {patientByDoctor && patientByDoctor.length > 0
                                && patientByDoctor.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.timeSlot}</td>
                                        <td>{item.reason}</td>
                                        <td>
                                            <button className='btn-primary' onClick={() => this.handleConfirm(item)}>Confirm</button>
                                        </td>
                                    </tr>
                                )
                            }

                            {patientByDoctor && patientByDoctor.length == 0
                                && <tr>
                                    <td>noData</td>
                                </tr>
                            }

                        </table>
                    </div>

                </div>
                {isOpenRemedyModal &&
                    <RemedyModal
                        isOpen={isOpenRemedyModal}
                        toggleFromParent={this.toggleModal}
                        dataModal={dataModal}
                        reFetchBookingDB={this.reFetchBookingDB}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInFo: state.user.userInfo,
        patientByDoctor: state.admin.patientByDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientByDoctor: (doctorId, date) => dispatch(actions.getPatientByDoctor(doctorId, date))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
