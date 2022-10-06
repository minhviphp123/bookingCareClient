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
            if (res && res.data.errCode === 0) {
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

export const saveDoctorInfo = (info) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.saveDoctorInfo(info);
            console.log(res);
            if (res && res.data.errCode === 0) {
                toast.success("save succeed");
                console.log(res.data.users);
                dispatch(saveDoctorInfoSuccess());
            } else {
                toast.warn("save fail");
                dispatch(saveDoctorInfoFail());
            }

        } catch (e) {
            dispatch(getTopDoctorFail());
        }
    }
}

export const saveDoctorInfoSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS
})

export const saveDoctorInfoFail = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAIL
})

//get doctor detail
export const getDetailDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.getDetailDoctor(id);
            if (res && res.data.errCode === 0) {
                dispatch(getDetailDoctorSuccess(res.data.detailDoctor));
            } else {
                toast.warn("save fail");
                dispatch(getDetailDoctorFail());
            }
        } catch (e) {
            dispatch(getDetailDoctorFail());
        }
    }
}

export const getDetailDoctorSuccess = (data) => ({
    type: actionTypes.GET_DOCTOR_DETAIL_SUCCESS,
    detailDoctor: data
})

export const getDetailDoctorFail = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAIL
})

//edit detail doctor
export const editDoctorInfo = (info) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.editMarkdown(info);
            if (res && res.data.errCode === 0) {
                toast.success("edited!");
                // dispatch(editDetailDoctorSuccess());
            } else {
                toast.warn("edit fail");
            }
        } catch (e) {
            return;
        }
    }
}

export const editDetailDoctorSuccess = (data) => ({
    type: actionTypes.EDIT_DETAIL_DOCTOR_SUCCESS,
    detailDoctor: data
})

export const editDetailDoctorFail = () => ({
    type: actionTypes.EDIT_DETAIL_DOCTOR_FAIL
})

//get time
export const getTime = () => {
    return async (dispatch, getState) => {
        try {
            //get data 
            let res = await userService.getAllCode('TIME');
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALLCODE_TIME_SUCCESS,
                    time: res.data.data
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALLCODE_TIME_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALLCODE_TIME_FAIL,
            });
        }
    }
}

//add schedule
export const newSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            //get data 
            console.log(data);
            await userService.newSchedule(data);

            // if (res && res.data.errCode === 0) {
            //     dispatch({
            //         type: actionTypes.GET_ALLCODE_TIME_SUCCESS,
            //         time: res.data.data
            //     });
            // } else {
            //     dispatch({
            //         type: actionTypes.GET_ALLCODE_TIME_FAIL,
            //     });
            // }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALLCODE_TIME_FAIL,
            });
        }
    }
}

export const getScheduleByDate = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            //get data 

            let res = await userService.getScheduleByDate(doctorId, date);
            console.log(typeof date);
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_SUCCESS,
                    schedule: res.data.data
                });
            } else {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_FAIL,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_SCHEDULE_FAIL,
            });
        }
    }
}

export const getAllCodeDoctor = () => {
    return async (dispatch, getState) => {
        try {
            //get data 

            dispatch({
                type: actionTypes.GET_MORE_DOCTOR_INFO_START
            })

            let resPrice = await userService.getAllCode('PRICE');
            let resPayment = await userService.getAllCode('PAYMENT');
            let resProvince = await userService.getAllCode('PROVINCE');
            let resSpecialty = await userService.getAllCode('specialty');
            if (resPrice && resPrice.data.errCode === 0
                && resPayment && resPayment.data.errCode === 0
                && resProvince && resProvince.data.errCode === 0
                && resSpecialty && resSpecialty.data.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data.data,
                    resPayment: resPayment.data.data,
                    resProvince: resProvince.data.data,
                    resSpecialty: resSpecialty.data.data
                }
                dispatch(getAllCodeDoctorSuccess(data))
            } else {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_FAIL,
                });
            }
        } catch (e) {
            dispatch(getAllCodeDoctorFail());
        }
    }
}

export const getAllCodeDoctorSuccess = (data) => ({
    type: actionTypes.GET_MORE_DOCTOR_INFO_SUCCESS,
    moreData: data
})

export const getAllCodeDoctorFail = () => ({
    type: actionTypes.GET_MORE_DOCTOR_INFO_FAIL
})

export const newBooking = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.newBooking(data);
            if (res && res.data.errCode === 0) {
                toast.success("book success!");
            } else {
                toast.error('book fail!');
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const newSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.newSpecialty(data);
            if (res && res.data.errCode === 0) {
                toast.success('add succeed!');
            } else {
                toast.error('add fail!');
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getAllSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllSpecialty();
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
                    allSpecialty: res.data.allSpecialty
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_SPECIALTY_FAIL
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getSpecialtyById = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getSpecialtyById(id);
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_SPECIALTY_SUCCESS,
                    specialty: res.data.specialty
                });
            } else {
                dispatch({
                    type: actionTypes.GETSPECIALTY_FAIL
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getDoctorBySpecialty = (specialty) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getDoctorBySpecialty(specialty);
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DOCTOR_SPE_SUCCESS,
                    doctorBySpe: res.data.doctorBySpe
                });
            } else {
                dispatch({
                    type: actionTypes.GET_DOCTOR_SPE_FAIL
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getScheduleById = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getScheduleById(id);
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_BY_ID_SUCCESS,
                    scheduleById: res.data.scheduleById
                });
            } else {
                dispatch({
                    type: actionTypes.GET_SCHEDULE_BY_ID_FAIL,
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const newClinic = (newClinic) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.newClinic(newClinic);
            if (res && res.data.errCode === 0) {
                toast.success('add succeed!');
            } else {
                toast.error('add fail!');
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getAllClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllClinic();
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_CLINIC_SUCCESS,
                    clinics: res.data.clinics
                });
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_CLINIC_FAIL,
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getClinicById = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getClinicById(id);
            if (res && res.data.errCode === 0) {
                console.log(res.data.clinicById);
                dispatch({
                    type: actionTypes.GET_CLINIC_BY_ID_SUCCESS,
                    clinicById: res.data.clinicById
                });
            } else {
                dispatch({
                    type: actionTypes.GET_CLINIC_BY_ID_FAIL,
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const getPatientByDoctor = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getPatientByDoctor(doctorId, date);
            if (res && res.data.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PATIENT_BY_DOCTOR_SUCCESS,
                    patientByDoctor: res.data.data
                });
            } else {
                dispatch({
                    type: actionTypes.GET_PATIENT_BY_DOCTOR_FAIL,
                });
            }

        } catch (e) {
            alert(e);
        }
    }
}

export const sendEmailConfirm = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data.patientId);
            await userService.sendEmailConfirm(data);
            await userService.delPatientById(data.patientId);
            // if (res && res.data.errCode === 0) {
            //     dispatch({
            //         type: actionTypes.GET_PATIENT_BY_DOCTOR_SUCCESS,
            //         patientByDoctor: res.data.data
            //     });
            // } else {
            //     dispatch({
            //         type: actionTypes.GET_PATIENT_BY_DOCTOR_FAIL,
            //     });
            // }

        } catch (e) {
            alert(e);
        }
    }
}









