"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRouter = void 0;
const express_1 = __importDefault(require("express"));
const skill_controller_1 = require("./skill.controller");
const multer_config_1 = require("../../config/multer.config");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', skill_controller_1.SkillControllers.getSkills);
router.post('/', (0, auth_1.default)(), multer_config_1.multerUpload.single("file"), skill_controller_1.SkillControllers.createSkill);
router.patch('/:id', multer_config_1.multerUpload.single("file"), skill_controller_1.SkillControllers.updateSkill);
router.delete('/:id', skill_controller_1.SkillControllers.deleteSkill);
// router.post('/:id', UserControllers.updateUser)
exports.SkillRouter = router;
