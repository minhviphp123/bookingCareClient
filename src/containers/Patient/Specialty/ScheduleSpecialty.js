import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './ScheduleSpecialty.scss';
import BookModal from '../Doctor/BookModal';
import HomeHeader from '../../HomePage/HomeHeader';
import { createLogger } from 'redux-logger';
import axios from 'axios';

class ScheduleSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scheduleById: [],
            dataFromParent: {},
            isOpenModal: false,
            pickedOne: {}
        }
    }

    booking = (data) => {
        this.setState({
            isOpenModal: true,
            pickedOne: data
        })
        console.log(data);
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    reFetchSchedule = () => {
        this.props.getScheduleById(this.props.doctorId);
    }

    async componentDidMount() {
        this.props.getScheduleById(this.props.doctorId);
        this.setState({
            dataFromParent: this.props.dataFromParent
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.scheduleById !== this.props.scheduleById) {
            this.setState({
                scheduleById: this.props.scheduleById
            })
        }
    }

    render() {
        let scheduleById = this.state.scheduleById;
        let isOpenModal = this.state.isOpenModal;
        console.log(this.state.dataFromParent);
        return (
            <div style={{ padding: "0 13px" }}>
                {isOpenModal &&
                    <BookModal
                        isOpen={isOpenModal}
                        toggleFromParent={this.toggleModal}
                        dataFromParent={this.state.pickedOne}
                        avt={this.state.dataFromParent}
                        reFetchSchedule={this.reFetchSchedule}
                    />
                }
                <div>Lịch Khám</div>
                {scheduleById && scheduleById.length > 0
                    &&
                    <div style={
                        {
                            marginBottom: "10px",
                            borderBottom: "1px solid",
                            width: "fit-content"
                        }
                    }>
                        <span>{new Date(scheduleById[0].date).getDate()}</span>
                        -
                        <span>{new Date(scheduleById[0].date).getMonth() + 1}</span>
                    </div>
                }

                {scheduleById && scheduleById.length > 0
                    && scheduleById.map((item) =>
                        <button className='scheduleItem' onClick={() => this.booking(item)}>{item.time}</button>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        scheduleById: state.admin.scheduleById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getScheduleById: (id) => dispatch(actions.getScheduleById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSpecialty);
