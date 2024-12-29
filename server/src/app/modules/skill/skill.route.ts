import express from 'express'
import { SkillControllers } from './skill.controller'
const router = express.Router()

router.get('/', SkillControllers.getSkills)
router.post('/', SkillControllers.createSkill)
router.patch('/:id', SkillControllers.updateSkill)
router.delete('/:id', SkillControllers.deleteSkill)

// router.post('/:id', UserControllers.updateUser)

export const SkillRouter = router
