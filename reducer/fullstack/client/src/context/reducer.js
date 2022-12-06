
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions'


const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAler: true, alertType: 'danger', alertText: "Plaese provide all value" }
    }
    if (action.type === CLEAR_ALERT) {
        return { ...state, showAler: false, alertType: '', alertText: "" }
    }
    throw new Error(`no such action :${action.type}`)
}


export default reducer;