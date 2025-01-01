import express from 'express'
import { UserRouter } from '../modules/user/user.route'
import { AuthRouter } from '../modules/Auth/auth.route'
import { SocialRouter } from '../modules/social/social.route'
import { ProjectRouter } from '../modules/project/project.route'
import { SkillRouter } from '../modules/skill/skill.route'
import { BlogRouter } from '../modules/blog/blog.route'

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
  {
    path: '/blog',
    route: BlogRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
