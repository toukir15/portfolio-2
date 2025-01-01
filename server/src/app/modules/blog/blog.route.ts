import express from 'express'
import { BlogControllers } from './blog.controller'
import { multerUpload } from '../../config/multer.config'
import auth from '../../middlewares/auth'
const router = express.Router()

router.get('/', BlogControllers.getBlogs)
router.get('/:id', BlogControllers.getBlog)
router.post('/', auth(), multerUpload.single("file"), BlogControllers.createBlog)
router.patch('/:id', multerUpload.single("file"), BlogControllers.updateBlog)
router.delete('/:id', BlogControllers.deleteBlog)

export const BlogRouter = router
