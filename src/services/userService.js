import axios from 'axios';

function handleLogin(name, password) {
    return axios.post('http://localhost:4000/login', { name, password });
}

function getAllUsers(id) {
    return axios.get(`http://localhost:4000/allUsers?id=ALL`)
}

function createNewUser(data) {
    return axios.post('http://localhost:4000/add', data);
}

function deleteUser(id) {
    return axios.delete('http://localhost:4000/deleteUser', { data: { id } });
}

function editUser(data) {
    return axios.put('http://localhost:4000/editUser', data);
}

function getAllCode(type) {
    return axios.get(`http://localhost:4000/allcode?type=${type}`);
}

function getTopDoctor(limit) {
    return axios.get(`http://localhost:4000/all-top-doctor?limit=${limit}`);
}

export default {
    handleLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCode,
    getTopDoctor
};
