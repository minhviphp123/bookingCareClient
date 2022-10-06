import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import * as actions from "../../../store/actions";
import './DoctorSchedule.scss';
import './DoctorSchedule.scss';
import { getScheduleByDate } from '../../../store/actions';
import BookModal from './BookModal';
// import DatePicker from '../../../components/Input/DatePicker';
// import Select from 'react-select';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            onChangeTime: false,
            doctorId: '',
            availableTime: [],
            isOpenModal: false,
            pickedOne: {},
            img: {}
        }
    }

    onchangeSelect = (e) => {
        console.log(e.target.value);
        let selectedDate = moment(e.target.value, 'DD.MM.YYYY').toISOString();
        console.log(selectedDate);
        let payload = {
            doctorId: this.props.doctorId.doctorId._id,
            date: selectedDate
        }
        this.props.getScheduleByDate(payload.doctorId, payload.date);
        this.setState({
            onChangeTime: true
        })
    }

    setDayArr = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'days').format('DD/MM/20YY');
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();


            allDays.push(object);
        }

        return allDays;
    }

    getTimeDidMount = () => {
        let dayArr = this.setDayArr();
        let date = moment(dayArr[0].label, 'DD.MM.YYYY').toISOString();
        let doctorId = this.props.doctorId.doctorId._id;
        this.props.getScheduleByDate(doctorId, date);
    }

    mapTime = () => {
        let a = this.state.allDays;
        a.map((item, index) => {
            if (index === 0) {
                console.log(index);
                return item.label = `Today - ${item.label}`
            } else {
                return item
            }
        });
    }

    bookingClick = (item) => {
        this.setState({
            isOpenModal: true,
            pickedOne: item
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    async componentDidMount() {
        let dayArr = this.setDayArr();
        this.setState({
            allDays: dayArr
        })
    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevProps.doctorId !== this.props.doctorId) {
            await this.getTimeDidMount();
            this.mapTime()
        }

        if (prevProps.schedule !== this.props.schedule) {
            this.setState({
                availableTime: this.props.schedule ? this.props.schedule : []
            })
        }

        if (prevProps.dataFromParent !== this.props.dataFromParent) {
            this.setState({
                img: this.props.dataFromParent
            })
        }

    }

    render() {
        let { allDays, onChangeTime, availableTime, doctorId } = this.state;
        let isOpenModal = this.state.isOpenModal;
        return (
            < div className='doctorScheduleContainer' >
                {isOpenModal &&
                    <BookModal
                        isOpen={isOpenModal}
                        toggleFromParent={this.toggleModal}
                        dataFromParent={this.state.pickedOne}
                        avt={this.state.img}
                    />
                }
                <div className="allSchedule">
                    <div>Select Date</div>
                    <select name="" id="" onChange={this.onchangeSelect} className='select'>
                        {/* <option value="0">Select...</option> */}
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) =>
                                <option key={index} value={(item.label.length > 10) ? ((item.label).slice(8, (item.label).length)) : (item.label)}>{item.label}</option>)}
                    </select>
                    <div className='viewSchedule'>
                        {/* onClick={this.props.ClickFromParent} */}
                        {availableTime && availableTime.length > 0 &&
                            availableTime.map((item, index) =>
                                <button key={index} className='scheduleItem' onClick={() => this.bookingClick(item)}>{item.time}</button>
                            )
                        }
                        {onChangeTime && availableTime && availableTime.length === 0 && <div>- - - - -Select Another- - - - -</div>}
                        {/* {schedule && schedule.length > 0 && <div key={schedule[0].doctorId}>{schedule[0].time}</div>} */}
                    </div>
                </div>
                <div className="allAvailable">

                </div>
            </div >
        );
    }
}




const mapStateToProps = state => {
    return {
        schedule: state.admin.schedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getScheduleByDate: (a, b) => dispatch(actions.getScheduleByDate(a, b))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
