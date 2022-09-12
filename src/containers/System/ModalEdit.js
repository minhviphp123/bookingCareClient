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

class ModalEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            password: ''
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.currentUser._id,
            name: this.props.currentUser.name
        })
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
        let inputArr = ['name'];
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


    handleEditUser = () => {
        this.checkValidateInput()
        this.props.toggleFromParent();
        let valid = this.checkValidateInput();
        if (valid === true) {
            this.props.editUser(this.state);
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
                    }}>Edit
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
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.handleEditUser() }}
                            className="btn">
                            Save
                        </Button>{' '}
                        <Button color="secondary" onClick={() => { this.toggle() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);



