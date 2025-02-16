"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteddAt: Date
}, {
    timestamps: true
});
const Category = mongoose_1.default.model('Category', categorySchema, 'category');
exports.default = Category;
