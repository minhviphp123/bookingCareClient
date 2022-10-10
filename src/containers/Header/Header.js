import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, userMenu } from './menuApp';
import './Header.scss';
import { __RouterContext } from 'react-router';
import { USER_ROLE } from '../../utils/constant';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    goHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    componentDidMount = () => {
        let userInfo = this.props.userInfo;
        let menu = [];
        if (userInfo) {
            let role = userInfo.role;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
            else {
                menu = userMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, name } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <div className='homeLink' ><Link to={'/home'} style={{ color: "white" }}>Home</Link></div>
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='greeting'>
                    <span>Welcome, {name ? name : ""} !</span>
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        name: state.user.userInfo.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
