import express from 'express'
import { UserRouter } from '../modules/user/user.route'
import { AuthRouter } from '../modules/Auth/auth.route'
import { SocialRouter } from '../modules/social/social.route'
import { ProjectRouter } from '../modules/project/project.route'
import { SkillRouter } from '../modules/skill/skill.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/social',
    route: SocialRouter,
  },
  {
    path: '/project',
    route: ProjectRouter,
  },
  {
    path: '/skill',
    route: SkillRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
