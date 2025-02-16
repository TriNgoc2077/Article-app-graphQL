import { gql } from "apollo-server-express";

export const typeDefsCategory = gql`
    type Category {
        id: ID,
        title: String,
        avatar: String,
    }

    type Query {
        getListCategory: [Category],
        getCategory(id: ID): Category,
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
        createCategory(category: CategoryInput): CategoryOutput
        updateCategory(id: ID, category: CategoryInput): CategoryOutput
        deleteCategory(id: ID): String

    }
`;