import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import service from '../../../services/userService';
import * as actions from "../../../store/actions";

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    handleDel = (id) => {
        this.props.delUserbyId(id)
    }

    handleEdit = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    async componentDidMount() {
        this.props.getAllUsersRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                users: this.props.listUsers
            })
        }
    }

    render() {

        let users = this.state.users;

        // console.log('check props:', this.props.listUsers);

        return (
            <table id="customers">
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>

                {users && users.length > 0 &&
                    users.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td className='but'>
                                <button onClick={() => this.handleEdit(item)}>Edit</button>
                                <button onClick={() => this.handleDel(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </table>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersRedux: () => dispatch(actions.getAllUserStart()),
        delUserbyId: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
