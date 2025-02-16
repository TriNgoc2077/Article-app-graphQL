import { resolversArticle } from "./article.Resolver";
import { resolversCategory } from "./category.Resolver";
import { resolversUser } from "./user.Resolver";

export const resolvers = [ 
    resolversArticle, 
    resolversCategory,
    resolversUser
];