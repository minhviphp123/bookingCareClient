const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    GET_ALL_CODE_START: 'GET_ALL_CODE_START',
    GET_ALL_CODE_SUCCESS: ' GET_ALL_CODE_SUCCESS',
    GET_ALL_CODE_END: 'GET_ALL_CODE_END',
    ADD_NEW_USER: ' ADD_NEW_USER',
    ADD_NEW_USER_SUCCESS: 'ADD_NEW_USER_SUCCESS',
    ADD_NEW_USER_FAIL: 'ADD_NEW_USER_FAIL',

    CREATE_USER_SUCCESS: ' CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: ' CREATE_USER_FAIL',

    GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
    GET_ALL_USERS_FAIL: 'GET_ALL_USERS_FAIL',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_FAIL',

    GET_DOCTOR_SUCCESS: 'GET_DOCTOR_SUCCESS',
    GET_DOCTOR_FAIL: 'GET_DOCTOR_FAIL',

    SAVE_INFO_DOCTOR_SUCCESS: ' SAVE_INFO_DOCTOR_SUCCESS',
    SAVE_INFO_DOCTOR_FAIL: ' SAVE_INFO_DOCTOR_FAIL',

    GET_DOCTOR_DETAIL_SUCCESS: 'GET_DOCTOR_DETAIL_SUCCESS',
    GET_DOCTOR_DETAIL_FAIL: 'GET_DOCTOR_DETAIL_FAIL',

    EDIT_DETAIL_DOCTOR_SUCCESS: 'EDIT_DETAIL_DOCTOR_SUCCESS',
    EDIT_DETAIL_DOCTOR_FAIL: 'EDIT_DETAIL_DOCTOR_FAIL',

    GET_ALLCODE_TIME_SUCCESS: 'GET_ALLCODE_TIME_SUCCESS',
    GET_ALLCODE_TIME_FAIL: 'GET_ALLCODE_TIME_FAIL',

    ADD_NEW_SCHEDULE_SUCCESS: 'ADD_NEW_SCHEDULE_SUCCESS',
    ADD_NEW_SCHEDULE_FAIL: 'ADD_NEW_SCHEDULE_FAIL',

    GET_SCHEDULE_SUCCESS: 'GET_SCHEDULE_SUCCESS',
    GET_SCHEDULE_FAIL: 'GET_SCHEDULE_FAIL',

    GET_MORE_DOCTOR_INFO_START: 'GET_MORE_DOCTOR_INFO_START',
    GET_MORE_DOCTOR_INFO_SUCCESS: 'GET_MORE_DOCTOR_INFO_SUCCESS',
    GET_MORE_DOCTOR_INFO_FAIL: 'GET_MORE_DOCTOR_INFO_FAIL',

    GET_ALL_SPECIALTY_SUCCESS: 'GET_ALL_SPECIALTY_SUCCESS',
    GET_ALL_SPECIALTY_FAIL: 'GET_ALL_SPECIALTY_FAIL',

    GET_SPECIALTY_SUCCESS: 'GET_SPECIALTY_SUCCESS',
    GET_SPECIALTY_FAIL: 'GET_SPECIALTY_FAIL',

    GET_DOCTOR_SPE_SUCCESS: 'GET_DOCTOR_SPE_SUCCESS',
    GET_DOCTOR_SPE_FAIL: 'GET_DOCTOR_SPE_FAIL',

    GET_SCHEDULE_BY_ID_SUCCESS: 'GET_SCHEDULE_BY_ID_SUCCESS',
    GET_SCHEDULE_BY_ID_FAIL: 'GET_SCHEDULE_BY_ID_FAIL',

    GET_ALL_CLINIC_SUCCESS: 'GET_ALL_CLINIC_SUCCESS',
    GET_ALL_CLINIC_FAIL: 'GET_ALL_CLINIC_FAIL',

    GET_CLINIC_BY_ID_SUCCESS: 'GET_CLINIC_BY_ID_SUCCESS',
    GET_CLINIC_BY_ID_FAIL: 'GET_CLINIC_BY_ID_FAIL',

    GET_PATIENT_BY_DOCTOR_SUCCESS: 'GET_PATIENT_BY_DOCTOR_SUCCESS',
    GET_PATIENT_BY_DOCTOR_FAIL: 'GET_PATIENT_BY_DOCTOR_FAIL'
})

export default actionTypes;

