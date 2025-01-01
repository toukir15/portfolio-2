/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { BlogServices } from './blog.service'

const getBlogs = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await BlogServices.getBlogsFromDB()
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Blogs retrive successfully',
            data: result,
        })
    },
)

const getBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await BlogServices.getBlogFromDB(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Blog retrive successfully',
            data: result,
        })
    },
)

const createBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await BlogServices.createBlogIntoDB(req.body.data, req.file, req.user.name)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Create blog successfully',
            data: result,
        })
    },
)

const updateBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await BlogServices.updateBlogIntoDB(req.body.data, req.file, req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Update blog successfully',
            data: result,
        })
    },
)

const deleteBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await BlogServices.deleteBlog(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'delete blog successfully',
            data: result,
        })
    },
)

export const BlogControllers = {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getBlog
}
