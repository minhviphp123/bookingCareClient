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

function saveDoctorInfo(data) {
    return axios.post('http://localhost:4000/post-info-doctor', data);
}

function getDetailDoctor(doctorId) {
    return axios.get(`http://localhost:4000/getDetailDoctor/${doctorId}`);
}

function getMarkdown() {
    return axios.get(`http://localhost:4000/getMarkdown`);
}

function editMarkdown(data) {
    return axios.post('http://localhost:4000/editMarkdown', data);
}

function getTime(type) {
    return axios.get(`http://localhost:4000/getMarkdown`);
}

function newSchedule(data) {
    return axios.post('http://localhost:4000/postScheduleDoctor', data);
}

function getScheduleByDate(doctorId, date) {
    return axios.get(`http://localhost:4000/getScheduleByDate?doctorId=${doctorId}&date=${date}`);
}

function newBooking(data) {
    return axios.post('http://localhost:4000/newBooking', data);
}

function newSpecialty(data) {
    return axios.post('http://localhost:4000/newSpecialty', data);
}

function getAllSpecialty() {
    return axios.get(`http://localhost:4000/getAllSpecialty`);
}

function getSpecialtyById(id) {
    return axios.get(`http://localhost:4000/getSpecialtyById/${id}`);
}

function getDoctorBySpecialty(specialty) {
    return axios.get(`http://localhost:4000/getDoctorBySpecialty/${specialty}`);
}

function getScheduleById(id) {
    return axios.get(`http://localhost:4000/getScheduleById/${id}`);
}

function newClinic(newClinic) {
    return axios.post('http://localhost:4000/newClinic', newClinic);
}

function getAllClinic() {
    return axios.get(`http://localhost:4000/getAllClinic`);
}

function getClinicById(id) {
    return axios.get(`http://localhost:4000/getClinicById/${id}`);
}

function getPatientByDoctor(doctorId, date) {
    return axios.get(`http://localhost:4000/getPatientByDoctor?doctorId=${doctorId}&date=${date}`);
}

function sendEmailConfirm(data) {
    return axios.post('http://localhost:4000/sendRemedy', data);
}

function delPatientById(id) {
    return axios.delete(`http://localhost:4000/delPatient/${id}`);
}

function delScheduleByTime(doctorId, time) {
    return axios.delete(`http://localhost:4000/delScheduleByTime/${doctorId}/${time}`);
}

export default {
    handleLogin, getAllUsers,
    createNewUser, deleteUser,
    editUser, getAllCode,
    getTopDoctor, saveDoctorInfo,
    getDetailDoctor, getMarkdown,
    editMarkdown, getTime,
    newSchedule, getScheduleByDate,
    newBooking, newSpecialty,
    getAllSpecialty, getSpecialtyById,
    getDoctorBySpecialty, getScheduleById,
    newClinic, getAllClinic,
    getClinicById, getPatientByDoctor,
    sendEmailConfirm, delPatientById,
    delScheduleByTime
};
