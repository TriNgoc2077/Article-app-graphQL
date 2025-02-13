import Article from "./Model/article.Model";

export const resolvers = {
    Query: {
        hello: () => {
            return 'hello world';
        },
        getListArticle: async () => {
            const articles = await Article.find({ deleted: false });
            return articles; 
        }
    }
}