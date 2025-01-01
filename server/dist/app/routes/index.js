"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const social_route_1 = require("../modules/social/social.route");
const project_route_1 = require("../modules/project/project.route");
const skill_route_1 = require("../modules/skill/skill.route");
const blog_route_1 = require("../modules/blog/blog.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter,
    },
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/social',
        route: social_route_1.SocialRouter,
    },
    {
        path: '/project',
        route: project_route_1.ProjectRouter,
    },
    {
        path: '/skill',
        route: skill_route_1.SkillRouter,
    },
    {
        path: '/blog',
        route: blog_route_1.BlogRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
