import Article from "./Model/article.Model";

export const resolvers = {
    Query: {
        hello: () => {
            return 'hello world';
        },
        getListArticle: async () => {
            const articles = await Article.find({ deleted: false });
            return articles; 
        },
        getArticle: async (_: any, args: any) => {
            const { id } = args;
            const article = await Article.findOne({ 
                _id: id,
                deleted: false
            });
            return article; 
        }
    },
    Mutation: {
        createArticle: async (_: any, args: any) => {
            const { article } = args;
            const record = new Article(article);
            await record.save();
            
            return record;
        }
    }
}