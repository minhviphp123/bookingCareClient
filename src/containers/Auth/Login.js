import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';

import service from '../../services/userService'
import { FormattedMessage } from 'react-intl';
import { reject } from 'lodash';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            errMess: ''
        }
    }

    handleOnchangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        //clear err
        this.setState({
            errMess: ''
        })
        try {
            const data = await service.handleLogin(this.state.name, this.state.password);
            //success
            if (data.data.errCode === 0) {
                this.props.userLoginSuccess(data.data.user);
                // this.setState({
                //     errMess: data.data.message
                // })
            } else if (data.data.errCode === 1) {
                this.setState({
                    errMess: data.data.message
                })
            }
            else {
                this.setState({
                    errMess: data.data.message
                })
            }
        } catch (err) {
            // console.log(err);
            // if (err.response) {
            //     if (err.response.data) {
            //         this.setState({
            //             errMess: err.response.data.message
            //         })
            //     }
            // }
            this.setState({
                errMess: 'login plz'
            })
        }
    }

    handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            //clear err
            this.setState({
                errMess: ''
            })
            try {
                const data = await service.handleLogin(this.state.name, this.state.password);
                //success
                if (data.data.errCode === 0) {
                    this.props.userLoginSuccess(data.data.user);
                    // this.setState({
                    //     errMess: data.data.message
                    // })
                } else if (data.data.errCode === 1) {
                    this.setState({
                        errMess: data.data.message
                    })
                }
                else {
                    this.setState({
                        errMess: data.data.message
                    })
                }
            } catch (err) {
                // console.log(err);
                // if (err.response) {
                //     if (err.response.data) {
                //         this.setState({
                //             errMess: err.response.data.message
                //         })
                //     }
                // }
                this.setState({
                    errMess: 'login plz'
                })
            }
        }
    }

    render() {
        return (
            <div className="login-background" >
                <div className="login-container" style={{ border: 'solid 2px blue', }}>
                    <div className="login-content row">
                        <div className='col-12 text-center'>Login</div>
                        <div className="col-12 form-group">
                            <label>name</label>
                            <input type="text" className='form-control' placeholder='Enter your name'
                                value={this.state.name}
                                onChange={(event) => {
                                    this.handleOnchangeInput(event)
                                }}
                            />
                        </div>

                        <div className="col-12 form-group">
                            <label>Password</label>
                            <input type='password' className='form-control' placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => {
                                    this.handleOnchangePassword(event)
                                }}
                                onKeyDown={this.handleKeyDown}
                            />
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMess}
                        </div>
                        <div className="col-12 co12">
                            <button onClick={() => { this.handleLogin() }} className="bu">Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12'>
                            <span>or login with</span>
                            <a href="">FB</a>
                            <a href="">GG</a>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
