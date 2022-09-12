import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from "react-toastify";

//get all code
export const getAllCode = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getAllCodeStart())
            //get data 
            let res = await userService.getAllCode('role');
            if (res && res.data.errCode === 0) {
                dispatch(getAllCodeSuccess(res.data.data))
            }

        } catch (e) {
            dispatch(getAllCodeFail());
        }
    }
}

export const getAllCodeStart = () => ({
    type: actionTypes.GET_ALL_CODE_START
})

export const getAllCodeSuccess = (data) => ({
    type: actionTypes.GET_ALL_CODE_SUCCESS,
    data: data
})

export const getAllCodeFail = () => ({
    type: actionTypes.GET_ALL_CODE_FAIL
})

//create
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUser(data);
            if (res && res.data === 'saved') {
                toast.success("create new user succeed");
                dispatch(saveUserSuccess(data));
                dispatch(getAllUserStart());
            } else {
                dispatch(saveUserFail());
            }

        } catch (e) {
            dispatch(saveUserFail());
        }
    }
}

export const saveUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

//get all
export const getAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers('all');

            if (res && res.data.errCode === 0) {
                dispatch(getAllUserSuccess(res.data.users.reverse()))
            } else {
                dispatch(getAllUserFail());
            }

        } catch (e) {
            dispatch(saveUserFail());
        }
    }
}

export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users: data
})

export const getAllUserFail = () => ({
    type: actionTypes.GET_ALL_USERS_FAIL
})

//delete
export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.deleteUser(id);
            if (res && res.data.errCode === 0) {
                toast.warn("del succeed");
                dispatch(deleteUserSuccess());
                dispatch(getAllUserStart());
            } else {
                dispatch(deleteUserFail());
            }

        } catch (e) {
            dispatch(deleteUserFail());
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

//edit
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.editUser(data);
            if (res && res.data.errCode === 0) {
                toast.success("update succeed");
                dispatch(editUserSuccess());
                dispatch(getAllUserStart());
            } else {
                dispatch(editUserFail());
            }

        } catch (e) {
            dispatch(editUserFail());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

//getDoctor
export const getTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.getTopDoctor(limit);
            console.log(res);
            if (res && res.data.errCode === 0) {
                console.log(res.data.users);
                dispatch(getTopDoctorSuccess(res.data.users));
            } else {
                dispatch(getTopDoctorFail());
            }

        } catch (e) {
            dispatch(getTopDoctorFail());
        }
    }
}

export const getTopDoctorSuccess = (data) => ({
    type: actionTypes.GET_DOCTOR_SUCCESS,
    doctors: data
})

export const getTopDoctorFail = () => ({
    type: actionTypes.GET_DOCTOR_FAIL
})
