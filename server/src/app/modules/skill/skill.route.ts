import express from 'express'
import { SkillControllers } from './skill.controller'
import { multerUpload } from '../../config/multer.config'
import auth from '../../middlewares/auth'
const router = express.Router()

router.get('/', SkillControllers.getSkills)
router.post('/', auth(), multerUpload.single("file"), SkillControllers.createSkill)
router.patch('/:id', multerUpload.single("file"), SkillControllers.updateSkill)
router.delete('/:id', SkillControllers.deleteSkill)

// router.post('/:id', UserControllers.updateUser)

export const SkillRouter = router
