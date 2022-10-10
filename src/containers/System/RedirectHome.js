import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import * as actions from "../../../store/actions";

class RedirectHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {

        return (
            <></>
        )

    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // newSpecialty: (data) => dispatch(actions.newSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedirectHome);
