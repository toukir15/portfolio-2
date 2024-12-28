"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const multer_config_1 = require("../../config/multer.config");
const bodyParser_1 = require("../../middlewares/bodyParser");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.AuthControllers.registerUser);
router.post('/login', auth_controller_1.AuthControllers.loginUser);
router.patch('/change-password', auth_controller_1.AuthControllers.changePassword);
router.patch('/forget-password', auth_controller_1.AuthControllers.forgetPassword);
router.post('/send-forget-email', auth_controller_1.AuthControllers.sendForgetEmail);
router.post('/edit-profile', multer_config_1.multerUpload.single('profilePhoto'), bodyParser_1.parseBody, auth_controller_1.AuthControllers.editProfile);
router.post('/refresh-token', auth_controller_1.AuthControllers.refreshToken);
exports.AuthRouter = router;
