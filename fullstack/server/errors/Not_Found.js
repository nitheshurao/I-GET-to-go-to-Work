import { StatusCodes } from 'http-status-codes';
import CustomApiError from './Custom-api.js'
class NotFoundError extends CustomApiError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError