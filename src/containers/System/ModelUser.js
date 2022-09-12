import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
} from 'reactstrap';
import './userManager.scss';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let inputArr = ['name', 'password'];
        let isValid = true;
        for (let index = 0; index < inputArr.length; index++) {
            if (!this.state[inputArr[index]]) {
                isValid = false;
                alert('Missing param: ' + inputArr[index]);
                break;
            }
        }
        return isValid;
    }


    handleAddNewUser = () => {
        this.checkValidateInput()
        this.props.toggleFromParent();
        let valid = this.checkValidateInput();
        if (valid === true) {
            this.props.createNewUser(this.state);
        }
        this.state.name = '';
        this.state.password = '';
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}>
                    <div style={{
                        background: "green",
                        padding: "10px",
                        color: "white"
                    }}>New User
                    </div>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>
                                <div className='ele'>
                                    <label>name</label>
                                    <input type="text" onChange={(e) => {
                                        this.handleOnchangeInput(e, 'name')
                                    }} value={this.state.name} />
                                </div>
                                <div className='ele'>
                                    <label>password</label>
                                    <input type="password" onChange={(e) => {
                                        this.handleOnchangeInput(e, 'password')
                                    }} value={this.state.password} />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.handleAddNewUser() }}
                            className="btn">
                            Do
                        </Button>{' '}
                        <Button color="secondary" onClick={() => { this.toggle() }} className="cancel">
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



