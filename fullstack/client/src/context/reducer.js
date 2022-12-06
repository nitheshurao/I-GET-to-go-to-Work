
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGEL_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUE,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,

    GET_JOB_BEGIN,
    GET_JOB_SUCCESS,
    GET_JOB_ERROR,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,

} from './actions'
import { initialState } from './appContext'


const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAler: true, alertType: 'danger', alertText: "Plaese provide all value" }
    }
    if (action.type === CLEAR_ALERT) {
        return { ...state, showAler: false, alertType: '', alertText: "" }
    }

    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state, isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAler: true,
            alertType: 'success',
            alertText: action.payload.alertText

        }
    }

    if (action.type === SETUP_USER_ERROR) {
        console.log("-- resE", action.payload)
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg || "error"
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        console.log("-red");
        return { ...state, isLoading: true }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        console.log("-red");
        return {
            ...state, isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAler: true,
            alertType: 'Login success',
            alertText: 'Login success! Redirecting...!'

        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        console.log("-red");
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg || "error"
        }
    }

    if (action.type == TOGGEL_SIDEBAR) {
        // console.log("09");
        return { ...state, showSidebar: !state.showSidebar }
    }
    if (action.type == LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null,
        }
    }

    if (action.type == UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        console.log("-- UP sU", action.payload)
        return {
            ...state, isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAler: true,
            alertType: 'success',
            alertText: 'USER PROFILE UPDATE'

        }
    }

    if (action.type === UPDATE_USER_ERROR) {
        console.log("-- resE", action.payload)
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg || "error"
        }
    }
    if (action.type == HANDLE_CHANGE) {
        return {
            ...state, [action.payload.name]: action.payload.value
        }
    }
    if (action.type == CLEAR_VALUE) {
        const initialState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.location || '',
            jobType: 'full-time',
            status: 'pending',
        }
        return { ...state, ...initialState }
    }

    if (action.type === CREATE_JOB_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created!',
        }
    }
    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    // get 
    if (action.type === GET_JOB_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages,
        }
    }
    if (action.type === GET_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type == SET_EDIT_JOB) {
        const job = state.jobs.find((job) => job._id === action.payload.id)
        const { _id, position, company, jobLocation, jobType, status } = job
        const initialState = {
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
        }
        return { ...state, ...initialState }
    }

    if (action.type === EDIT_JOB_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type == EDIT_JOB_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job Updated',
        }

    }
    if (action.type == EDIT_JOB_ERROR) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    throw new Error(`no such action :${action.type}`)
}


export default reducer;