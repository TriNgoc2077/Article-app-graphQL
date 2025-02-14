import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Category {
        id: ID,
        title: String,
        avatar: String,
    }

    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Query {
        hello: String,
        getListArticle: [Article],
        getArticle(id: ID): Article,
        getListCategory: [Category],
        getCategory(id: ID): Category,
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

    input CategoryInput {
        title: String,
        avatar: String,
    }
    type CategoryOutput {
        category: Category,
        success: Boolean,
        message: String
    }
    type Mutation {
        createArticle(article: ArticleInput): ArticleOutput
        deleteArticle(id: ID): String
        updateArticle(id: ID, article: ArticleInput): ArticleOutput

        
        createCategory(category: CategoryInput): CategoryOutput
        updateCategory(id: ID, category: CategoryInput): CategoryOutput
        deleteCategory(id: ID): String

    }
`;