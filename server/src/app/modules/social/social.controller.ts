/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { SocialServices } from './social.services'

const createSocial = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user._id
        const result = await SocialServices.createSocialIntoDB(req.body, userId)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Create social document successfully',
            data: result,
        })
    },
)

const updateSocial = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await SocialServices.updateSocialIntoDB(req.body, req.user._id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Update social document successfully',
            data: result,
        })
    },
)

const getSocial = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await SocialServices.getSocialFromDB()
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Retrive social document successfully',
            data: result,
        })
    },
)

const sendEmailToMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await SocialServices.sendEmailToMe(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Create social document successfully',
            data: result,
        })
    },
)



export const SocialControllers = {
    createSocial,
    sendEmailToMe,
    getSocial,
    updateSocial
}
