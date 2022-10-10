import React, { Component } from 'react';
import { connect } from "react-redux";
// import * as actions from "../../../store/actions";
// import './DoctorNav.scss';
import HomeHeader from '../HomePage/HomeHeader';
// import ScheduleSpecialty from './ScheduleSpecialty';
import { Link } from 'react-router-dom';

class DoctorNav extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        return (
            <div style={{ color: "green" }}>
                <HomeHeader />

                <div style={{
                    fontSize: "30px",
                    textAlign: "center"
                }}>DoctorNav</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorNav);
