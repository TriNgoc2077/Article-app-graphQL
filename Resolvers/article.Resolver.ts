import Article from "../Model/article.Model";
import Category from "../Model/category.Model";

export const resolversArticle = {
    Query: {
        getListArticle: async (_: any, args: any) => {
            const { sortKey, sortValue, currentPage, limitItem } = args;
            //Sort
            const sort: Record<string, any> = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue; 
            }
            //Pagination
            const skip = (currentPage - 1) * limitItem;
            
            const articles = await Article.find({ deleted: false }).sort(sort).limit(limitItem).skip(skip);
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
        }
    }
}