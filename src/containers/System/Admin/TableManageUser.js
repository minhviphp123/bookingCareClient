import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import service from '../../../services/userService';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

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
            <React.Fragment>
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
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </React.Fragment>

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
