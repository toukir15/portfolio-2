import express from 'express'
import { ProjectController } from './project.controller'
import { multerUpload } from '../../config/multer.config'
const router = express.Router()

router.get('/', ProjectController.getProjects)
router.post('/', multerUpload.single("file"), ProjectController.createProject)
router.patch('/:id', multerUpload.single("file"), ProjectController.updateProject)
router.delete('/:id', ProjectController.deleteProject)

export const ProjectRouter = router
