import { unauthenticated } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
    // if(resourceUserId.role ==='admin') return
    if (requestUser.userId === resourceUserId.toString()) return

    throw new unauthenticated('Not authorized to access this route')
}

export default checkPermissions