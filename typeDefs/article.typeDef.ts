import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Query {
        getListArticle: [Article],
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