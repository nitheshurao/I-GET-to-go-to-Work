import jwt from 'jsonwebtoken'
import { unauthenticated } from '../errors/index.js'
const auth = async (req, res, next) => {
    const header = req.headers
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new unauthenticated('Authentiction Invaild')

    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("---palod --- ", payload)
        // req.user = payload
        req.user = { userId: payload.userId }
        next()
    } catch (er) {
        throw new unauthenticated('Authentiction Invaild')
    }
    // console.log("h---", header)
    // console.log("A---", authHeader)
    // next()



}

export default auth