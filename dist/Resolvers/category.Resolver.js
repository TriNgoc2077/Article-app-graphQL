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
exports.resolversCategory = void 0;
const category_Model_1 = __importDefault(require("../Model/category.Model"));
exports.resolversCategory = {
    Query: {
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = yield category_Model_1.default.find({ deleted: false });
            return categories;
        }),
        getCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield category_Model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return category;
        }),
    },
    Mutation: {
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { category } = args;
                const record = new category_Model_1.default(category);
                yield record.save();
                return {
                    category: record,
                    success: true,
                    message: 'update successfully !'
                };
            }
            catch (error) {
                const result = {
                    success: false,
                    message: 'create failed'
                };
                console.log(error);
                return result;
            }
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = args;
                yield category_Model_1.default.updateOne({ _id: id }, {
                    deleted: true,
                    deletedAt: new Date()
                });
                return 'deleted successfully !';
            }
            catch (error) {
                console.log(error);
                return 'delete failed';
            }
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, category } = args;
                yield category_Model_1.default.updateOne({ _id: id, deleted: false }, category);
                const record = yield category_Model_1.default.findOne({ _id: id, deleted: false });
                return {
                    category: record,
                    success: true,
                    message: 'update successfully !'
                };
            }
            catch (error) {
                const result = {
                    success: false,
                    message: 'update failed'
                };
                console.log(error);
                return result;
            }
        }),
    }
};
