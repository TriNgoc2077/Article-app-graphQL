import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String
    }

    type Query {
        hello: String,
        getListArticle: [Article],
        getArticle(id: ID): Article
    }

    input ArticleInput {
        title: String,
        avatar: String,
        description: String
    }
    type ArticleOutput {
        article: Article,
        success: Boolean,
        message: String
    }
    type Mutation {
        createArticle(article: ArticleInput): ArticleOutput
        deleteArticle(id: ID): String
    }
`;