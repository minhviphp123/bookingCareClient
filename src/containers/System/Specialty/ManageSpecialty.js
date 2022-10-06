import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSpecialty.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from "react-toastify";
import { CommonUtils } from '../../../utils';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgBase64: '',
            descHTML: '',
            descMarkdown: '',
            image: ''
        }
    }

    handleOchangeInput = (e, id) => {
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
                    imgBase64: base64
                })
            } catch (err) {
                throw new Error(err);
            }
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descHTML: html,
            descMarkdown: text
        })
    }

    handleClickSave = () => {
        this.props.newSpecialty(this.state);
        this.setState({
            name: '',
            imgBase64: '',
            descHTML: '',
            descMarkdown: '',
            image: ''
        })
        document.querySelector('.ip').value = ''
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { doctors, time } = this.state;
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Manage Specialty</div>
                <div className='add-new-specialty row'>
                    <div className="col-6 form-group">
                        <label htmlFor="">Specialty Name</label>
                        <input type="text" className='form-control' value={this.state.name}
                            onChange={(e) => this.handleOchangeInput(e, 'name')}
                        />
                    </div>
                    {/* <div className="col-6 form-group">
                        <label htmlFor="">Specialty IMG</label>
                        <input type="file" className='form-control' value={this.state.imgBase64}
                            onChange={(e) => this.handleOnchangeImg(e)}
                        />
                    </div> */}

                    <div className='col-6 form-group'>
                        <label htmlFor="" className=''>Specialty IMG</label>
                        {/* <label htmlFor="">Specialty Name</label> */}
                        <input type="file" id='upload' className='form-control ip' onChange={(e) => this.handleOnchangeImg(e)} />
                    </div>


                </div>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descMarkdown}
                />
                <div className='col-12'>
                    <button className='btn-save-specialty' onClick={this.handleClickSave}>Save</button>
                </div>
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
        newSpecialty: (data) => dispatch(actions.newSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
