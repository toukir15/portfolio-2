"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const multer_config_1 = require("../../config/multer.config");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', project_controller_1.ProjectController.getProjects);
router.post('/', (0, auth_1.default)(), multer_config_1.multerUpload.single("file"), project_controller_1.ProjectController.createProject);
router.patch('/:id', multer_config_1.multerUpload.single("file"), project_controller_1.ProjectController.updateProject);
router.delete('/:id', project_controller_1.ProjectController.deleteProject);
exports.ProjectRouter = router;
