/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { ProjectServices } from './project.service'

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

const updateProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await ProjectServices.updateProjectIntoDB(req.body.data, req.file, req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Update project successfully',
            data: result,
        })
    },
)

const deleteProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await ProjectServices.deleteProjectFromDB(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'delete project successfully',
            data: result,
        })
    },
)


export const ProjectController = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
}
