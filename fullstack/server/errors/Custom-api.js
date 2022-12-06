import { StatusCodes } from 'http-status-codes';
class CustomApiError extends Error {
    constructor(message) {
        super(message)
        // this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

export default CustomApiError