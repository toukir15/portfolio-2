import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { catchAsync } from '../utils/catchAsync'
import { verifyToken } from '../utils/verifyJWT'
import { User } from '../modules/user/user.model'

const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        // checking if the token is missing
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }

        const decoded = verifyToken(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload
        const { _id } = decoded
        // checking if the user is exist
        const user = await User.findById(_id)
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
        }
        req.user = decoded as JwtPayload
        next()
    })
}

export default auth
