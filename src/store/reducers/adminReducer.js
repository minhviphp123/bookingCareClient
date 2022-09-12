import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingRole: false,
    role: [],
    users: [],
    doctors: []
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
            // console.log(action.users);
            // state.users = action.users;
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


        default:
            return state;
    }
}

export default adminReducer;