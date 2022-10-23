import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookModal.scss';
import * as actions from '../../../store/actions';
import axios from 'axios';
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

class BookModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            date: '',
            timeSlot: '',
            name: '',
            phone: '',
            email: '',
            address: '',
            reason: '',
            isOpenModal: ''
        }
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
        let inputArr = ['name', 'phone', 'address', 'email', 'reason'];
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

    handleBook = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.newBooking(this.state);
            await axios.delete(`http://localhost:4000/delScheduleByTime/${this.state.doctorId}/${this.state.timeSlot}`)
            this.props.reFetchSchedule();
            this.props.toggleFromParent();
        }
    }

    componentDidMount = () => {
        this.setState({
            doctorId: this.props.avt.doctorId._id,
            timeSlot: this.props.dataFromParent.time,
            date: this.props.dataFromParent.date,
            isOpenModal: this.props.isOpen
        })
    }


    render() {
        let date = new Date(this.props.dataFromParent.date).getUTCDate() + 1;
        let month = new Date(this.props.dataFromParent.date).getUTCMonth() + 1;
        let year = new Date(this.props.dataFromParent.date).getUTCFullYear();

        return (
            <div>
                <Modal isOpen={this.state.isOpenModal} toggle={() => { this.toggle() }} size="lg">
                    {/* {this.props.img && <img src={this.props.img} alt="avt" />} */}
                    {this.props.avt &&
                        <div>
                            <div className='imgCtn' style={{
                                width: "fit-content",
                                height: "fit-content",
                                margin: "0 auto"
                            }}>
                                <img src={Buffer.from(this.props.avt.doctorId.avt, 'base64').toString('binary')} alt=""
                                    style={{
                                        borderRadius: "50%",
                                        width: "230px",
                                        height: "230px"
                                    }}
                                />
                            </div>
                        </div>}
                    {this.props.dataFromParent &&
                        <div style={{ textAlign: "center" }}>
                            {this.props.avt &&
                                <span>B.S {this.props.avt.doctorId.name}</span>
                            }
                            <br />
                            <span style={{ width: "fit-content", margin: "20px auto" }}>{this.props.dataFromParent.time}</span>
                            <br />
                            <span>{date}-{month}-{year}</span>
                        </div>
                    }
                    <ModalBody>
                        <div className='containerr'>
                            <div className='ele'>
                                <label>Name</label>
                                <input type="text" onChange={(e) => {
                                    this.handleOnchangeInput(e, 'name')
                                }} value={this.state.name} />
                            </div>
                            <div className='ele'>
                                <label>Phone</label>
                                <input type="phone" onChange={(e) => {
                                    this.handleOnchangeInput(e, 'phone')
                                }} value={this.state.phone} />
                            </div>
                            <div className='ele'>
                                <label>Address</label>
                                <input type="text" onChange={(e) => {
                                    this.handleOnchangeInput(e, 'address')
                                }} value={this.state.address} />
                            </div>
                            <div className='ele'>
                                <label>Email</label>
                                <input type="text" onChange={(e) => {
                                    this.handleOnchangeInput(e, 'email')
                                }} value={this.state.email} />
                            </div>
                            <div className='elee'>
                                <label>Reason</label>
                                <input type="text" className='eleee' onChange={(e) => {
                                    this.handleOnchangeInput(e, 'reason')
                                }} value={this.state.reason} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleBook}
                            className="btu">
                            Book
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
        newBooking: (data) => dispatch(actions.newBooking(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookModal);



