"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const multer_config_1 = require("../../config/multer.config");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', blog_controller_1.BlogControllers.getBlogs);
router.get('/:id', blog_controller_1.BlogControllers.getBlog);
router.post('/', (0, auth_1.default)(), multer_config_1.multerUpload.single("file"), blog_controller_1.BlogControllers.createBlog);
router.patch('/:id', multer_config_1.multerUpload.single("file"), blog_controller_1.BlogControllers.updateBlog);
router.delete('/:id', blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRouter = router;
