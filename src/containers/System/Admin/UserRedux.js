import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import userService from '../../../services/userService';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { CommonUtils } from '../../../utils';
import { CRUD_ACTIONS } from '../../../utils';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            avt: '',
            role: '',
            image: '',

            roleArr: [],

            users: [],

            isOpen: false,

            action: CRUD_ACTIONS.CREATE,

            id: ''
        }
    }

    async componentDidMount() {
        this.props.getAllCode();
    }

    handleOnClickIMG = () => {
        if (this.state.image) {
            this.setState({
                isOpen: true
            })
        }
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }

    handleOnchangeImg = async (e) => {
        let base64 = await CommonUtils.getBase64(e.target.files[0]);
        this.setState({
            image: URL.createObjectURL(e.target.files[0]),
            avt: base64
        })
    }

    handleSubmit = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return
        }
        //fire action
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser(this.state);
        }

        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.props.editUser(this.state);
            this.setState({
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'password', 'image'];
        for (let index = 0; index < arrCheck.length; index++) {
            if (!this.state[arrCheck[index]]) {
                isValid = false;
                alert(`the ${arrCheck[index]} is required!`);
                break;
            }
        }
        return isValid;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.role !== this.props.role) {
            let arrRole = this.props.role;
            this.setState({
                roleArr: this.props.role,
                role: arrRole && arrRole.length > 0 ? arrRole[0].value : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRole = this.props.role;
            this.setState({
                name: '',
                password: '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].value : '',
                image: ''
            })
        }
    }

    handleEditUserFromParent = (user) => {
        const imageBase64 = Buffer.from(user.avt, 'base64').toString('binary');

        this.setState({
            name: user.name,
            password: 'password',
            role: user.role,
            action: CRUD_ACTIONS.EDIT,
            id: user._id,
            avt: imageBase64,
            image: imageBase64
        })
        console.log(this.state);
    }

    render() {
        let roleArr = this.state.roleArr;
        return (

            <div className='user-redux-container'>
                <div className="title">user redux</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="form-title">Add New User</div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input type="text" class="form-control ip" id="exampleInputEmail1" aria-describedby="emailHelp"
                                        value={this.state.name}
                                        placeholder="Name" onChange={(e) => this.handleOnchangeInput(e, 'name')} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control ipp" id="exampleInputPassword1" placeholder="Password"
                                        value={this.state.password} onChange={(e) => this.handleOnchangeInput(e, 'password')} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Role</label>
                                    <select class="form-control"
                                        onChange={(e) => this.handleOnchangeInput(e, 'role')}
                                        value={this.state.role}
                                    >
                                        {roleArr && roleArr.length > 0 &&
                                            roleArr.map((item, index) => {
                                                return (<option value={item.value} key={index} className='op'>
                                                    {item.value}
                                                </option>)
                                            }

                                            )}
                                    </select>
                                </div>
                                <div className='avtCont'>
                                    <label htmlFor="" className='avt'>AVT</label>
                                    <div className='uploadImg'>
                                        <input type="file" id='upload' hidden onChange={(e) => this.handleOnchangeImg(e)} />
                                        <label htmlFor="upload" className='btnUpload'>Upload IMG</label>
                                        <div className='preview'>
                                            <img src={this.state.image} alt="" className='previewImg' onClick={() => this.handleOnClickIMG()} />
                                        </div>

                                        {this.state.isOpen && (
                                            <Lightbox className="lightbox"
                                                mainSrc={this.state.image}
                                                onCloseRequest={() => this.setState({ isOpen: false })}
                                            />
                                        )}

                                    </div>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                </div>
                                {/* <button class="btn btn-primary" onClick={this.handleSubmit}>Submit</button> */}
                            </form>
                            <button class={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : "btn btn-primary"} onClick={this.handleSubmit}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Edit' : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <TableManageUser
                        handleEditUserFromParent={this.handleEditUserFromParent}
                        action={this.state.action}
                    />
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        role: state.admin.role,
        isLoadingRole: state.admin.isLoadingRole,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCode: () => dispatch(actions.getAllCode()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getAllUsers: () => dispatch(actions.getAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
