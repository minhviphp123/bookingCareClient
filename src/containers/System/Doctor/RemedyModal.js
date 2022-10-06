import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';
import './RemedyModal.scss';
import * as actions from '../../../store/actions';
import { CommonUtils } from '../../../utils';
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
import { isBuffer, set } from 'lodash';
import actionTypes from '../../../store/actions/actionTypes';
// import './userManager.scss';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: true,
            email: '',
            imgBase64: '',
            patientId: ''
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    onchangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnchangeFile = async (e) => {
        let file = e.target.files[0];
        if (file) {
            try {
                let base64 = await CommonUtils.getBase64(file);
                this.setState({
                    imgBase64: base64
                })
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    handleConfirm = () => {
        //check empty value or not
        if (document.querySelector('.email').value == '') {
            alert('missing email')
            return
        }
        if (document.querySelector('.file').value == '') {
            alert('missing file');
            return
        }
        //
        this.setState({
            isOpenModal: false
        })
        this.props.sendEmailConfirm(this.state);
        axios.delete(`http://localhost:4000/delPatient/${this.state.patientId}`);
        setTimeout(() => {
            this.props.reFetchBookingDB()
        }, 210);
    }

    componentDidMount = () => {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                patientId: this.props.dataModal.patientId
            })
        }
    }

    render() {
        let { email } = this.state

        return (
            <div>
                <Modal isOpen={this.state.isOpenModal} toggle={() => { this.toggle() }} size="md">
                    <ModalHeader toggle={this.toggle}>Send Invoice</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label htmlFor="">Patient Email</label>
                                <input type="email" name="" className='form-control email' value={email}
                                    onChange={this.onchangeEmail}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <div className='form-control'>
                                    <label htmlFor="">Select Prescription </label>
                                    <input type="file" name="" className='form-control-file file'
                                        onChange={(e) => this.handleOnchangeFile(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleConfirm} className='btnn'>
                            Confirm
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggle} className='btnn'>Cancel</Button>
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
        sendEmailConfirm: (data) => dispatch(actions.sendEmailConfirm(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);



