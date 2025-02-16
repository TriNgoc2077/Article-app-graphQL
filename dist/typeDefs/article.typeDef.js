"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Query {
        getListArticle( 
            sortKey: String, 
            sortValue: String, 
            currentPage: Int = 1, 
            limitItem: Int = 2,
            filterKey: String,
            filterValue: String,
            keyword: String
        ): [Article],
        getArticle(id: ID): Article,
    }

    input ArticleInput {
        title: String,
        avatar: String,
        description: String,
        categoryId: String
    }
    type ArticleOutput {
        article: Article,
        success: Boolean,
        message: String
    }
    type Mutation {
        createArticle(article: ArticleInput): ArticleOutput
        deleteArticle(id: ID): String
        updateArticle(id: ID, article: ArticleInput): ArticleOutput
    }
`;
