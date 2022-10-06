import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import service from '../../../services/userService';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import userService from '../../../services/userService';
// import style manually

import 'react-markdown-editor-lite/lib/index.css';
//css
import './ManageDoctor.scss';
import { createLogger } from 'redux-logger';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            doctorId: '',
            specialty: '',
            price: '',
            payment: '',
            province: '',
            nameClinic: '',
            addressClinic: '',
            contentHTML: '',
            contentMarkdown: '',
            changeSelect: false,
            desc: ''
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleClickSave = () => {
        this.props.saveDoctorInfo(this.state);
        this.setState({
            specialty: '',
            price: '',
            payment: '',
            province: '',
            nameClinic: '',
            addressClinic: '',
            contentHTML: '',
            contentMarkdown: '',
            desc: '',
        })
    }

    handleClickEdit = () => {
        this.props.editDoctorInfo(this.state);
        this.setState({
            specialty: '',
            price: '',
            payment: '',
            province: '',
            nameClinic: '',
            addressClinic: '',
            contentHTML: '',
            contentMarkdown: '',
            desc: '',
        })
    }

    handleOnchangeText = (e) => {
        this.setState({
            desc: e.target.value
        })
    }

    handleOnChangeSelect = async (e) => {
        this.setState({
            changeSelect: false,
            doctorId: e.target.value
        });
        let checkExist = false;
        let res = await userService.getMarkdown();

        let markdownDBArr = res.data.detailDoctor;

        for (let index = 0; index < markdownDBArr.length; index++) {
            const element = markdownDBArr[index];
            if (this.state.doctorId === element.doctorId) {
                this.setState({
                    specialty: element.specialty,
                    price: element.price,
                    payment: element.payment,
                    province: element.province,
                    nameClinic: element.nameClinic,
                    addressClinic: element.addressClinic,
                    contentHTML: element.contentHTML,
                    contentMarkdown: element.contentMarkdown,
                    desc: element.desc,
                    changeSelect: true
                })
                checkExist = true;
                break;
            }
        }

        if (checkExist === false) {
            this.setState({
                specialty: '',
                price: '',
                payment: '',
                province: '',
                nameClinic: '',
                addressClinic: '',
                contentHTML: '',
                contentMarkdown: '',
                desc: '',
            })
        }
    };

    // onchangeRemainingSelect = (e) => {
    //     console.log(e.target.name);
    //     // console.log(e.target.value);
    //     this.state[e.target.name] = e.target.value;
    // }

    onchangeRemainingSelect = (e, prop) => {
        this.setState({
            [prop]: e.target.value
        })
    }

    onchangeText = (e, id) => {
        let copyState = this.state;
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
        console.log(this.state);
    }

    async componentDidMount() {
        this.props.getTopDoctor(100);
        this.props.getAllCodeDoctor();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors
            })
        }

    }

    render() {
        let doctors = this.state.doctors;
        let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allCodeDoctor;

        // console.log('check props:', this.props.listUsers);

        return (
            <div className='manage-doctor-container' style={
                {
                    padding: "5px"
                }}>
                <div className='manage-doctor-title' style={{
                    textAlign: "center",
                    margin: "15px 0 15px 0",
                    fontSize: "22px"
                }}>Create more info</div>

                <div className="newDoctorInfo">
                    <div className="selectDoctor" style={{ margin: "20px 0" }}>
                        <label htmlFor="">Select doctor</label>
                        <select onChange={this.handleOnChangeSelect}>
                            <option value="0">------</option>
                            {doctors && doctors.map((item) => <option value={item._id}>{item.name}</option>)}
                        </select>
                    </div>

                    <div className="inputs">
                        <div className="DoctorIpItem">
                            <label htmlFor="">Select Price</label>
                            <select name="price" id="" placeholder='Select Price' className='form-control'
                                onChange={(e, props) => this.onchangeRemainingSelect(e, 'price')} value={this.state.price}>
                                <option value="0">------</option>
                                {resPrice && resPrice.length > 0 &&
                                    resPrice.map((item, index) =>
                                        <option value={item.value} key={index}>{item.value}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="DoctorIpItem">
                            <label htmlFor="">Select Payment Method</label>
                            <select name="payment" id="" placeholder='Select Price' className='form-control'
                                onChange={(e, props) => this.onchangeRemainingSelect(e, 'payment')} value={this.state.payment}>
                                {/* value={this.state.payment} */}
                                <option value="0">------</option>
                                {resPayment && resPayment.length > 0 &&
                                    resPayment.map((item, index) =>
                                        <option value={item.value} key={index}>{item.value}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="DoctorIpItem">
                            <label htmlFor="">Select Province</label>
                            <select name="province" id="" className='form-control'
                                onChange={(e, props) => this.onchangeRemainingSelect(e, 'province')} value={this.state.province}>
                                <option value="0">------</option>
                                {resProvince && resProvince.length > 0 &&
                                    resProvince.map((item, index) =>
                                        <option value={item.value} key={index}>{item.value}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="DoctorIpItem">
                            <label htmlFor="">Select Specialty</label>
                            <select name="specialty" id="" className='form-control'
                                onChange={(e, props) => this.onchangeRemainingSelect(e, 'specialty')} value={this.state.specialty}>
                                <option value="0">------</option>
                                {resSpecialty && resSpecialty.length > 0 &&
                                    resSpecialty.map((item, index) =>
                                        <option value={item.value} key={index}>{item.value}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="DoctorIpItem">
                            <label htmlFor="Select Price">Clinic Name</label>
                            <input type="text" className='form-control' value={this.state.nameClinic} onChange={(e) => this.onchangeText(e, 'nameClinic')} />
                        </div>
                        <div className="DoctorIpItem">
                            <label htmlFor="Select Price">Select AddressClinic</label>
                            <input type="text" className='form-control' value={this.state.addressClinic} onChange={(e) => this.onchangeText(e, 'addressClinic')} />
                        </div>
                    </div>

                </div>

                <div className='moreInfo'>
                    <div className="content-left">
                        <label htmlFor="">Introductory Information:</label>
                        <textarea name="" className="textArea" rows="9" cols="40" style={{
                            width: ""
                        }} onChange={this.handleOnchangeText} value={this.state.desc}>
                        </textarea>
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className='saveBtn' style={{
                    margin: "15px auto",
                    width: "",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    {this.state.changeSelect ?
                        <button className='save-content-doctor' style={{
                            color: "green",
                            padding: "6px 0",
                            border: "1px solid",
                            fontWeight: "bold"
                        }} onClick={this.handleClickEdit}>Edit</button>
                        :
                        <button className='save-content-doctor' style={{
                            color: "green",
                            padding: "6px 0",
                            border: "1px solid",
                            fontWeight: "bold"
                        }} onClick={this.handleClickSave}>Save</button>
                    }
                </div>
            </div >

        );
    }

}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        allCodeDoctor: state.admin.moreDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: () => dispatch(actions.getTopDoctor(100)),
        saveDoctorInfo: (info) => dispatch(actions.saveDoctorInfo(info)),
        editDoctorInfo: (info) => dispatch(actions.editDoctorInfo(info)),
        getAllCodeDoctor: () => dispatch(actions.getAllCodeDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
