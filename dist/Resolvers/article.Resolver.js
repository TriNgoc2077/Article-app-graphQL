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
exports.resolversArticle = void 0;
const article_Model_1 = __importDefault(require("../Model/article.Model"));
const category_Model_1 = __importDefault(require("../Model/category.Model"));
exports.resolversArticle = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword } = args;
                const find = {
                    deleted: false
                };
                //Sort
                const sort = {};
                if (sortKey && sortValue) {
                    sort[sortKey] = sortValue;
                }
                //Pagination
                let skip = 0;
                if (currentPage && limitItem) {
                    skip = (currentPage - 1) * limitItem;
                }
                //Filter
                if (filterKey && filterValue) {
                    find[filterKey] = filterValue;
                }
                //Search
                let keywordRegex;
                if (keyword) {
                    keywordRegex = new RegExp(keyword, "i");
                    find["title"] = keywordRegex;
                }
                const articles = yield article_Model_1.default.find(find).sort(sort).limit(limitItem).skip(skip);
                return articles;
            }
            catch (error) {
                console.log(error);
            }
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_Model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield category_Model_1.default.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { article } = args;
                const record = new article_Model_1.default(article);
                yield record.save();
                return {
                    article: record,
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
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = args;
                yield article_Model_1.default.updateOne({ _id: id }, {
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
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, article } = args;
                yield article_Model_1.default.updateOne({ _id: id, deleted: false }, article);
                const record = yield article_Model_1.default.findOne({ _id: id, deleted: false });
                return {
                    article: record,
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
        })
    }
};
