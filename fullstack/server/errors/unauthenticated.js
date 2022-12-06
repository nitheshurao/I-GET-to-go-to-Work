
import { StatusCodes } from 'http-status-codes';
import CustomApiError from './Custom-api.js'
class unauthenticated extends CustomApiError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

export default unauthenticated