import express from 'express'
import { ProjectController } from './project.controller'
import { multerUpload } from '../../config/multer.config'
const router = express.Router()

router.post('/', multerUpload.single("file"), ProjectController.createProject)
router.get('/', ProjectController.getProjects)

export const ProjectRouter = router
