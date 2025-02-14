import Article from "./Model/article.Model";
import Category from "./Model/category.Model";

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
        },
        getListCategory: async () => {
            const categories = await Category.find({ deleted: false });
            return categories; 
        },
        getCategory: async (_: any, args: any) => {
            const { id } = args;
            const category = await Category.findOne({ 
                _id: id,
                deleted: false
            });
            return category; 
        },
    },
    Article: {
        category: async (article: any) => {
            const categoryId = article.categoryId;
            const category = await Category.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        }
    },
    Mutation: {
        createArticle: async (_: any, args: any) => {
            try {
                const { article } = args;
            
                const record = new Article(article);
                await record.save();

                return {
                    article: record,
                    success: true,
                    message: 'update successfully !'
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
        },
        updateArticle: async (_: any, args: any) => {
            try {
                const { id, article } = args;
                await Article.updateOne(
                    { _id: id, deleted: false },
                    article
                )
                const record = await Article.findOne({ _id: id, deleted: false });
                return {
                    article: record,
                    success: true,
                    message: 'update successfully !'
                }
            } catch(error) {
                const result = {
                    success: false,
                    message: 'update failed'
                }
                console.log(error);
                return result;
            }
        },
        createCategory: async (_: any, args: any) => {
            try {
                const { category } = args;
            
                const record = new Category(category);
                await record.save();

                return {
                    category: record,
                    success: true,
                    message: 'update successfully !'
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
        deleteCategory: async (_: any, args: any) => {
            try {
                const { id } = args;
                await Category.updateOne(
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
        },
        updateCategory: async (_: any, args: any) => {
            try {
                const { id, category } = args;
                await Category.updateOne(
                    { _id: id, deleted: false },
                    category
                )
                const record = await Category.findOne({ _id: id, deleted: false });
                return {
                    category: record,
                    success: true,
                    message: 'update successfully !'
                }
            } catch(error) {
                const result = {
                    success: false,
                    message: 'update failed'
                }
                console.log(error);
                return result;
            }
        },
    }
}