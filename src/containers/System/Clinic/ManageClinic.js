import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageClinic.scss';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import { CommonUtils } from '../../../utils';
// import moment from 'moment';
// import FormattedDate from '../../../components/Formating/FormattedDate';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from "react-toastify";
import { dateFormat } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            img: '',
            contentMarkdown: '',
            contentHTML: '',
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'address', 'img', 'contentMarkdown'];
        for (let index = 0; index < arrCheck.length; index++) {
            if (!this.state[arrCheck[index]]) {
                isValid = false;
                alert(`the ${arrCheck[index]} is required!`);
                break;
            }
        }
        return isValid;
    }

    handleOnchangeInput = (e, id) => {
        let copyState = this.state;
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnchangeImg = async (e) => {
        let file = e.target.files[0];
        if (file) {
            try {
                let base64 = await CommonUtils.getBase64(file);
                this.setState({
                    img: base64
                })
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleClickSave = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.newClinic(this.state);
        }
        this.setState({
            name: '',
            address: '',
            img: '',
            contentMarkdown: '',
            contentHTML: '',
        })
        document.querySelector('.form-control-file').value = ''
    }

    componentDidMount = () => {

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { doctors, time } = this.state;
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className='m-s-title'>
                    <div className="title">Manage Clinic</div>
                    <div className="container">
                        <div className="row">
                            <div className='col-6'>
                                <label htmlFor="">Clinic Name</label>
                                <input type="text" className='form-control' value={this.state.name}
                                    onChange={(e) => this.handleOnchangeInput(e, 'name')}
                                />
                            </div>

                            <div className="col-6 form-group imgClinic">
                                <label htmlFor="">Clinic IMG</label>
                                <input type="file" className='form-control-file'
                                    onChange={(e) => this.handleOnchangeImg(e)}
                                />
                            </div>

                            <div className="col-12 form-group">
                                <label htmlFor="">Clinic Address</label>
                                <input type="text" className='form-control' value={this.state.address}
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                />
                            </div>
                        </div>
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
                <div className='col-6 btnn'>
                    <button className='btn-primary btnnn' onClick={this.handleClickSave}>
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        newClinic: (newClinic) => dispatch(actions.newClinic(newClinic))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
