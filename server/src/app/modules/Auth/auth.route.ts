import express from 'express'
import { AuthControllers } from './auth.controller'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/register',
  multerUpload.single("file"),
  AuthControllers.registerUser,
)
router.post('/login', AuthControllers.loginUser)

router.patch(
  '/change-password',
  AuthControllers.changePassword,
)

router.patch(
  '/forget-password',
  AuthControllers.forgetPassword,
)

router.post('/send-forget-email', AuthControllers.sendForgetEmail)

router.post(
  '/edit-profile',
  auth(),
  multerUpload.single('file'),
  // parseBody,
  AuthControllers.editProfile,
)

router.post(
  '/refresh-token',
  AuthControllers.refreshToken,
)

export const AuthRouter = router
