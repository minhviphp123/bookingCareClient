import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Footer.scss';
import * as actions from "../../../store/actions";

class Footer extends Component {

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
            <div className='footerCont'>
                Footer
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        // lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getTopFooter: () => dispatch(actions.getTopFooter(6))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));