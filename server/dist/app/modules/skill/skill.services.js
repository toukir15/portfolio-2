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
exports.SkillServices = void 0;
const user_model_1 = require("../user/user.model");
const skill_model_1 = __importDefault(require("./skill.model"));
const getSkillsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_model_1.default.find(); // Get all skills from DB
    // Group skills by category
    const groupedByCategory = result.reduce((acc, skill) => {
        // Check if the category already exists in the accumulator, if not, initialize it
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        // Push the current skill into the respective category
        acc[skill.category].push(skill);
        return acc;
    }, {});
    return groupedByCategory;
});
const createSkillIntoDB = (data, file, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = JSON.parse(data); // Parse the input data
    parseData.image = file.path; // Add the file path to the data
    const result = yield skill_model_1.default.create(parseData);
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { skill: result._id },
    }, { new: true });
    return result;
});
const updateSkillIntoDB = (data, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = JSON.parse(data);
    if (file) {
        parseData.image = file.path;
    }
    const result = yield skill_model_1.default.findByIdAndUpdate(id, parseData, { new: true });
    return result;
});
const deleteSkillFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_model_1.default.findByIdAndDelete(id, { new: true });
    return result;
});
exports.SkillServices = {
    createSkillIntoDB,
    getSkillsFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB
};
