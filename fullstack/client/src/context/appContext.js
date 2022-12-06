import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import reducer from './reducer';
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
    EDIT_JOB_BEGIN,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_ERROR,
    EDIT_JOB_ERROR,
    EDIT_JOB_SUCCESS,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('location')
export const initialState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userlocation || '',
    jobLocation: userlocation || '',
    showSidebar: false,
    editJobId: '',
    isEditing: false,
    position: '',
    company: '',
    jobLocation: userlocation || '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,

    stats: {},
    monthlyApplications: [],


    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //default header globaly
    // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
    // defualt base on url

    // axios
    const authFetch = axios.create({
        baseURL: '/',
        // api/vi/
    })
    // request

    authFetch.interceptors.request.use(

        (config) => {
            console.log("intec", config)
            config.headers['Authorization'] = `Bearer ${state.token}`
            console.log("intec a--", config)
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    // response

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )



    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT, })
        }, 2000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }
    const RemoveUserFroLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }


    const setupUser = async ({ currentuser, endPoint, alertText }) => {

        console.log("--cu-", currentuser)
        dispatch({ type: SETUP_USER_BEGIN })

        try {
            const response = await axios.post(`/auth/${endPoint}`, currentuser);
            // http://localhost:5000/api/vi/auth/register

            console.log("appcont", response);
            const { user, token, location } = response.data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    alertText
                },
            })
            // Locla Storage
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            console.log("-apC", error.response);
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()

    }



    const registerUser = async (currentuser) => {
        console.log("--cu-", currentuser)
        dispatch({ type: REGISTER_USER_BEGIN })

        try {
            const response = await axios.post('/auth/register', currentuser);
            // http://localhost:5000/api/vi/auth/register

            console.log("appcont", response);
            const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location
                },
            })
            // Locla Storage
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            console.log("-apC", error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()
    }
    const loginUser = async (currentuser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await axios.post('/auth/login', currentuser);


            console.log("appcont", response);
            const { user, token, location } = response.data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location
                },
            })
            // Locla Storage
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        // console.log("00");
        dispatch({ type: TOGGEL_SIDEBAR })
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        RemoveUserFroLocalStorage()
    }

    const updateUser = async (currentuser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentuser)
            // const { data } = await axios.patch('/auth/updateUser', currentuser)
            const { user, location, token } = data
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token },
            })
            addUserToLocalStorage({ user, location, token })
        } catch (error) {
            console.log("error", error);
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }

        }
        clearAlert()
    }




    const handleChange = async ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value }
        })
    }

    const clearValues = async () => {
        dispatch({ type: CLEAR_VALUE })
    }

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status, token } = state

            await authFetch.post('/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status,
                token
            })
            dispatch({ type: CREATE_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUE })

        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const getJobs = async () => {
        let url = '/jobs'

        dispatch({ type: GET_JOB_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: GET_JOB_SUCCESS,
                payload: {
                    jobs, totalJobs, numOfPages
                }
            })

        } catch (error) {
            if (error.response.status === 401) {
                logoutUser()
            }

            dispatch({ type: GET_JOB_ERROR })

        }
        clearAlert()
    }
    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }


    // .....
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { company, position, jobLocation, jobType, status, } = state
            await authFetch.patch(`/jobs/${state.editJobId}`,
                {
                    company,
                    position,
                    jobLocation,
                    jobType,
                    status,

                })
            dispatch({ type: EDIT_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUE })
        } catch (error) {
            if (error.response.status === 401) {
                logoutUser()
            }

            dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg } })

        }
        clearAlert()

    }

    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            await authFetch.delete(`jobs/${jobId}`)
            getJobs()


            dispatch({ type: DELETE_JOB_SUCCESS })

            dispatch({ type: CLEAR_VALUE })
        } catch (error) {
            console.log(
                error
            );
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
            // logoutUser()

        }
    }
    // ......................
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch('/jobs/stats')
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                }
            })
        } catch (error) {
            console.log(error);

        }
        clearAlert()
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                setupUser,
                toggleSidebar,
                logoutUser,
                updateUser,
                handleChange,
                clearValues,
                createJob,
                getJobs,

                editJob,
                setEditJob,
                deleteJob,

                showStats,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider };