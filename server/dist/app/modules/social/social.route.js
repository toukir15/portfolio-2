"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialRouter = void 0;
const express_1 = __importDefault(require("express"));
const social_controller_1 = require("./social.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), social_controller_1.SocialControllers.createSocial);
router.get('/', social_controller_1.SocialControllers.getSocial);
router.patch('/', (0, auth_1.default)(), social_controller_1.SocialControllers.updateSocial);
router.post('/send-email', social_controller_1.SocialControllers.sendEmailToMe);
// router.post('/:id', UserControllers.updateUser)
exports.SocialRouter = router;
