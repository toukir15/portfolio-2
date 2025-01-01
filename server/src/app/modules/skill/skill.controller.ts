/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { SkillServices } from './skill.services'

const createSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user._id
        const result = await SkillServices.createSkillIntoDB(req.body.data, req.file, userId)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Create skill successfully',
            data: result,
        })
    },
)

const updateSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await SkillServices.updateSkillIntoDB(req.body.data, req.file, req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Update skill successfully',
            data: result,
        })
    },
)

const getSkills = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await SkillServices.getSkillsFromDB()
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Retrive skills successfully',
            data: result,
        })
    },
)

const deleteSkill = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await SkillServices.deleteSkillFromDB(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Delete skill successfully',
            data: result,
        })
    },
)

export const SkillControllers = {
    createSkill,
    updateSkill,
    getSkills,
    deleteSkill
}
