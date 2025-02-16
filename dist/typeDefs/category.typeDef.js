"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql) `
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
