"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const blog_model_1 = __importDefault(require("./blog.model"));
const blog_model_2 = __importDefault(require("./blog.model"));
const getBlogsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.find();
    return result;
});
const getBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findById(id);
    return result;
});
const createBlogIntoDB = (data, file, authorName) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = JSON.parse(data);
    parseData.image = file.path;
    parseData.author = authorName;
    const result = yield blog_model_1.default.create(parseData);
    return result;
});
const updateBlogIntoDB = (data, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = JSON.parse(data);
    if (file) {
        parseData.image = file.path;
    }
    const result = yield blog_model_2.default.findByIdAndUpdate(id, parseData, { new: true });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_2.default.findByIdAndDelete(id);
    return result;
});
// const updateUserIntoDB = async (id: string) => {
//     const result = await User.findByIdAndUpdate(
//         id,
//         { role: 'admin' },
//         { new: true },
//     )
//     return result
// }
exports.BlogServices = {
    createBlogIntoDB,
    getBlogsFromDB,
    updateBlogIntoDB,
    deleteBlog,
    getBlogFromDB
};
