import express from 'express'
import { SocialControllers } from './social.controller'
const router = express.Router()

router.post('/', SocialControllers.createSocial)
router.get('/', SocialControllers.getSocial)
router.post('/send-email', SocialControllers.sendEmailToMe)

// router.post('/:id', UserControllers.updateUser)

export const SocialRouter = router
