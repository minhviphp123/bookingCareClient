import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingRole: false,
    role: [],
    users: [],
    doctors: [],
    detailDoctor: [],
    time: [],
    schedule: [],
    moreDoctorInfo: [],
    allSpecialty: [],
    specialty: [],
    doctorBySpe: [],
    scheduleById: [],
    clinics: [],
    clinicById: [],
    patientByDoctor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CODE_START:

            return {
                ...state,
                isLoadingRole: true
            }
        case actionTypes.GET_ALL_CODE_SUCCESS:
            let copyState = { ...state }
            copyState.role = action.data
            return {
                ...copyState
            }
        case actionTypes.GET_ALL_CODE_FAIL:
            return {
                ...state
            }

        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
            }

        case actionTypes.CREATE_USER_FAIL:
            return { ...state }

        case actionTypes.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            }

        case actionTypes.GET_ALL_USERS_FAIL:
            return {
                ...state
            }

        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state
            }

        case actionTypes.EDIT_USER_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_DOCTOR_SUCCESS:
            return {
                ...state,
                doctors: action.doctors
            }

        case actionTypes.GET_DOCTOR_FAIL:
            return {
                ...state
            }

        case actionTypes.SAVE_INFO_DOCTOR_SUCCESS:
            console.log('saved doctor!')
            return {
                ...state
            }
        case actionTypes.SAVE_INFO_DOCTOR_FAIL:
            console.log('save doctor fail')

        case actionTypes.GET_DOCTOR_DETAIL_SUCCESS:
            let copyStatee = { ...state }
            copyStatee.detailDoctor = action.detailDoctor
            return {
                ...copyStatee
            }

        case actionTypes.GET_DOCTOR_DETAIL_FAIL:
            console.log('get detail doctor fail')
            return {
                ...state
            }

        case actionTypes.GET_ALLCODE_TIME_SUCCESS:
            return {
                ...state,
                time: action.time
            }

        case actionTypes.GET_ALLCODE_TIME_FAIL:
            console.log('get all time fail');
            return {
                ...state
            }

        case actionTypes.GET_SCHEDULE_SUCCESS:
            return {
                ...state,
                schedule: action.schedule
            }

        case actionTypes.GET_SCHEDULE_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_MORE_DOCTOR_INFO_SUCCESS:
            return {
                ...state,
                moreDoctorInfo: action.moreData
            }

        case actionTypes.GET_MORE_DOCTOR_INFO_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
            return {
                ...state,
                allSpecialty: action.allSpecialty
            }

        case actionTypes.GET_ALL_SPECIALTY_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_SPECIALTY_SUCCESS:
            return {
                ...state,
                specialty: action.specialty
            }

        case actionTypes.GET_SPECIALTY_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_DOCTOR_SPE_SUCCESS:
            return {
                ...state,
                doctorBySpe: action.doctorBySpe
            }

        case actionTypes.GET_DOCTOR_SPE_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_SCHEDULE_BY_ID_SUCCESS:
            return {
                ...state,
                scheduleById: action.scheduleById
            }

        case actionTypes.GET_SCHEDULE_BY_ID_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_ALL_CLINIC_SUCCESS:
            return {
                ...state,
                clinics: action.clinics
            }

        case actionTypes.GET_ALL_CLINIC_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_CLINIC_BY_ID_SUCCESS:
            return {
                ...state,
                clinicById: action.clinicById
            }

        case actionTypes.GET_CLINIC_BY_ID_FAIL:
            return {
                ...state
            }

        case actionTypes.GET_PATIENT_BY_DOCTOR_SUCCESS:
            return {
                ...state,
                patientByDoctor: action.patientByDoctor
            }


        case actionTypes.GET_PATIENT_BY_DOCTOR_FAIL:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;