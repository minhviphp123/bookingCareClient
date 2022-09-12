import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManager.scss';
import service from '../../services/userService';
import { set } from 'lodash';
import ModelUser from './ModelUser';
import ModalEdit from './ModalEdit';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            isOpenModalUser: false,
            isOpenModalEdit: false,
            editUser: {}
        }
    }

    async componentDidMount() {
        let res = await service.getAllUsers('ALL');
        if (res && res.data.errCode === 0) {
            this.setState({
                userArr: res.data.users.reverse()
            })
        }
    }

    // componentDidMount() {

    // }

    getAllUserFromReact = async () => {
        let res = await service.getAllUsers('ALL');
        if (res && res.data.errCode === 0) {
            this.setState({
                userArr: res.data.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditModal = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })
    }

    createNewUser = async (data) => {
        try {
            await service.createNewUser(data);
            await this.getAllUserFromReact();
        } catch (err) {
            console.log(err);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            await service.deleteUser(user._id);
            await this.getAllUserFromReact()
        } catch (err) {
            console.log(err);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEdit: true,
            editUser: user
        })
    }

    editUser = async (user) => {
        await service.editUser(user);
        alert('updated')
    }

    render() {

        let userArr = this.state.userArr;

        return (
            <div className="users-container">
                {this.state.isOpenModalUser &&
                    <ModelUser isOpen={this.state.isOpenModalUser}
                        toggleFromParent={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />
                }
                {this.state.isOpenModalEdit &&
                    <ModalEdit
                        isOpen={this.state.isOpenModalEdit}
                        toggleFromParent={this.toggleEditModal}
                        currentUser={this.state.editUser}
                        editUser={this.editUser}
                    />
                }
                <h1 className='title text-center'>Manage users</h1>

                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={this.handleAddNewUser}>
                        Add new user
                    </button>
                </div>

                <div className='users-table mt-3  mx-2'>
                    <table id="customers">
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        {userArr && userArr.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td className='td'>
                                        <button className='btn btn-primary px-3'
                                            onClick={() => this.handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn btn-primary px-3'
                                            onClick={() => this.handleDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
