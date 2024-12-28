/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { ProjectServices } from './project.service'

const createProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await ProjectServices.createProjectIntoDB(req.body.data, req.file)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Create project successfully',
            data: result,
        })
    },
)

const getProjects = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await ProjectServices.getProjectsFromDB()
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Projects retrive successfully',
            data: result,
        })
    },
)

export const ProjectController = {
    createProject,
    getProjects
}
