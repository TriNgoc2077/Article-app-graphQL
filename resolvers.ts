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
            try {
                const { article } = args;
            
                const record = new Article(article);
                await record.save();

                const success = true;
                const message = 'create successfully 1 !';
                return {
                    article: record,
                    success: success,
                    messge: message
                }
            } catch(error) {
                const result = {
                    success: false,
                    message: 'create failed'
                }
                console.log(error);
                return result;
            }
        },
        deleteArticle: async (_: any, args: any) => {
            try {
                const { id } = args;
                await Article.updateOne(
                    { _id: id },
                    { 
                        deleted: true,
                        deletedAt: new Date()
                    }
                );
                return 'deleted successfully !'
            } catch(error) {
                console.log(error);
                return 'delete failed';
            }
        }
    }
}