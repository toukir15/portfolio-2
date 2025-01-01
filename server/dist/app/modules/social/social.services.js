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
exports.SocialServices = void 0;
const user_model_1 = require("../user/user.model");
const social_model_1 = __importDefault(require("./social.model"));
const createSocialIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findSocial = yield social_model_1.default.find();
    if (findSocial.length > 0) {
        throw new Error("Social links already exist");
    }
    const result = yield social_model_1.default.create(payload);
    yield user_model_1.User.findByIdAndUpdate(userId, {
        social: result.id
    });
    return result;
});
const updateSocialIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findById(id);
    const result = yield social_model_1.default.findByIdAndUpdate(findUser.social, payload);
    return result;
});
const getSocialFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield social_model_1.default.find().select({
        _id: 0,
        __v: 0,
    });
    return result[0];
});
const sendEmailToMe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const json = JSON.stringify(Object.assign(Object.assign({}, payload), { access_key: "6d93e15f-4c83-4ce8-ba81-fd0514297039" }));
    yield fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    });
});
// const getUserFromDB = async (userId: string) => {
//     // Find the user by ID
//     const findUser = await User.findById(userId)
//     if (!findUser) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
//     }
//     const result = await User.findById(userId)
//     return result
// }
// const updateUserIntoDB = async (id: string) => {
//     const result = await User.findByIdAndUpdate(
//         id,
//         { role: 'admin' },
//         { new: true },
//     )
//     return result
// }
exports.SocialServices = {
    createSocialIntoDB,
    sendEmailToMe,
    updateSocialIntoDB,
    getSocialFromDB
};
