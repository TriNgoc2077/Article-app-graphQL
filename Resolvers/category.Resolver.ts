import Category from "../Model/category.Model";

export const resolversCategory = {
    Query: {
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
    Mutation: {
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