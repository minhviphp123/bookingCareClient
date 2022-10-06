import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
// import moment from 'moment';
// import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from "react-toastify";
import { dateFormat } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorName: '',
            doctors: [],
            doctorId: '',
            currentDate: '',
            time: [],
            selectArr: []
        }
    }

    handleOnChangeSelect = (e) => {
        this.setState({
            doctorId: e.target.value
        })
    }

    handleOnchangeDatePicker = (date) => {
        let datee = new Date(date[0]).toISOString();
        this.setState({
            currentDate: datee
        })

    }

    handleClickTime = (itemTime) => {
        let timeArr = this.state.time;
        if (timeArr && timeArr.length > 0) {
            timeArr = timeArr.map(item => {
                if (item._id === itemTime._id) { item.isSelected = !item.isSelected }
                return item;
            })

        }
        this.setState({
            time: timeArr
        })
    }

    handleClickSave = () => {
        let timeArr = this.state.time;
        let selectedArr = [];
        let checkBook = false;
        if (!this.state.doctorId) {
            toast.error("doctorId is required!");
        }
        if (!this.state.currentDate) {
            toast.error("currentDate is required!");
        }

        if (timeArr && timeArr.length > 0) {
            for (let index = 0; index < timeArr.length; index++) {
                const element = timeArr[index];
                if (element.isSelected === true) {
                    selectedArr.push({
                        doctorId: this.state.doctorId,
                        date: this.state.currentDate,
                        time: element.value,
                        maxNumber: 10
                    });
                    checkBook = true
                }
            }

        }
        if (checkBook === true) {
            this.setState({
                selectArr: selectedArr
            })
            this.props.newSchedule(selectedArr);
            toast.success('added');
            timeArr = timeArr.map(item => ({ ...item, isSelected: false }));
            this.setState({
                doctorName: '',
                currentDate: '',
                time: timeArr
            })
        } else {
            toast.warn('you havent booked')
        }

    }

    componentDidMount = () => {
        this.props.getTopDoctor(100);
        this.props.getTime();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors
            })
        }
        if (prevProps.time !== this.props.time) {
            let timeArr = this.props.time;
            if (timeArr && timeArr.length > 0) {
                timeArr = timeArr.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                time: timeArr
            })
        }
    }


    render() {
        let { doctors, time } = this.state;
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className='m-s-title'>
                    <div className="title">Manage Schedule</div>
                    <div className="container">
                        <div className="row">
                            <div className='col-6'>
                                <label htmlFor="">Select Doctor</label>
                                <select onChange={this.handleOnChangeSelect} className='form-control'>
                                    <option value="0">Select doctors:</option>
                                    {doctors && doctors.map((item) => <option value={item._id} className='doctorOption'>{item.name}</option>)}
                                </select>
                            </div>
                            <div className='col-6'>
                                <label htmlFor="">Select Date</label>
                                <DatePicker onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date().setHours(0, 0, 0, 0)}
                                // defaultValue={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {time && time.length > 0 &&
                                    time.map((item, index) => {
                                        if (item.isSelected === false) {
                                            return (<button className='timeItem' key={index} onClick={() => this.handleClickTime(item)}>
                                                {item.value}
                                            </button>)
                                        } else {
                                            return (<button className='timeItem colorUp' key={index} onClick={() => this.handleClickTime(item)}>
                                                {item.value}
                                            </button>)
                                        }
                                    }
                                    )
                                }
                            </div>
                            <button className='btn-primary' onClick={this.handleClickSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        time: state.admin.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: () => dispatch(actions.getTopDoctor(100)),
        getTime: () => dispatch(actions.getTime()),
        newSchedule: (newSchedule) => dispatch(actions.newSchedule(newSchedule))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
