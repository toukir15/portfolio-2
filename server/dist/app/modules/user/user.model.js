"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: 1, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    about: { type: String, default: "" },
    profilePhoto: { type: String, required: true },
    social: { type: mongoose_1.Schema.ObjectId, default: null, ref: 'Social' },
    skill: [{ type: mongoose_1.Schema.ObjectId, default: [], ref: 'Skill' }],
}, { timestamps: true });
exports.User = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
