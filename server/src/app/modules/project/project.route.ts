import express from 'express'
import { ProjectController } from './project.controller'
import { multerUpload } from '../../config/multer.config'
import auth from '../../middlewares/auth'
const router = express.Router()

router.get('/', ProjectController.getProjects)
router.post('/', auth(), multerUpload.single("file"), ProjectController.createProject)
router.patch('/:id', multerUpload.single("file"), ProjectController.updateProject)
router.delete('/:id', ProjectController.deleteProject)

export const ProjectRouter = router
