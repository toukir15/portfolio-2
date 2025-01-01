import express from 'express'
import { SocialControllers } from './social.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post('/', auth(), SocialControllers.createSocial)
router.get('/', SocialControllers.getSocial)
router.patch('/', auth(), SocialControllers.updateSocial)
router.post('/send-email', SocialControllers.sendEmailToMe)

// router.post('/:id', UserControllers.updateUser)

export const SocialRouter = router
