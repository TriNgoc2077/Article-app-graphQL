"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const article_Resolver_1 = require("./article.Resolver");
const category_Resolver_1 = require("./category.Resolver");
const user_Resolver_1 = require("./user.Resolver");
exports.resolvers = [
    article_Resolver_1.resolversArticle,
    category_Resolver_1.resolversCategory,
    user_Resolver_1.resolversUser
];
