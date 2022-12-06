import React, { useReducer, useContext } from 'react';

import reducer from './reducer';
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions'


export const initialState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: '',
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT, })
        }, 2000)
    }


    return (
        <AppContext.Provider
            value={{
                ...state, displayAlert, clearAlert
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