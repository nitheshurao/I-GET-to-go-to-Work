import User from "../models/User.js"

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, unauthenticated } from "../errors/index.js";


const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name, !email, !password) {
        throw new BadRequestError('Please Provide all values!..')
    }
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in used')
    }

    // try {
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.OK)
        .json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name
            }
            , token,
            location: user.location,
        });
    // } catch (error) {
    //     res.status(500).json({ msg: error });
    //     // next(error)
    // }
}

const login = async (req, res) => {
    // res.send("login User")/

    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError("Please provide all valuse!..")
    }
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new unauthenticated("Invalide Credentials...")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new unauthenticated("Invalide Credentials")
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })

}

const updateUser = async (req, res) => {
    console.log("---update", req.body);
    // res.send("update User")
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError('Please Provide all Value')
    }
    const user = await User.findOne({ _id: req.user.userId })
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

    const token = user.createJWT()
    // user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })

}

export { register, login, updateUser }