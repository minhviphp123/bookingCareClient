import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import * as actions from "../store/actions";


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Header from './Header/Header';
import System from '../routes/System';
import Login from './Auth/Login';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import SpecialtyNav from './HeaderNav/SpecialtyNav';
import DoctorNav from './HeaderNav/DoctorNav';
import Facility from './HeaderNav/Facility';
import PackageNav from './HeaderNav/Package';
import RedirectHome from './System/RedirectHome';

import ConfirmModal from '../components/ConfirmModal';
import { times } from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: null
        }
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
        if (this.props.userInfo) {
            this.setState({
                userInfo: this.props.userInfo
            })
        }
        console.log(this.props.userInfo);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo != null) {
            try {
                this.setState({
                    userRole: this.props.userInfo.role
                })
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    render() {
        let userRole = this.state.userRole;
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    {<Route path={path.SYSTEM}
                                        component={userRole !== 'User'
                                            ? (userIsAuthenticated(System))
                                            : RedirectHome}
                                    />}

                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />

                                    <Route path={'/home/specialty'} component={SpecialtyNav} />
                                    <Route path={'/home/doctor'} component={DoctorNav} />
                                    <Route path={'/home/facility'} component={Facility} />
                                    <Route path={'/home/package'} component={PackageNav} />

                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.DETAIL_SPECAILTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route component={() => { return (<Redirect to={'/home'} />) }} />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        {/* Same as */}
                        <ToastContainer />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.userLoginSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);