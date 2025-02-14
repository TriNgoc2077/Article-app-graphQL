import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deleteddAt: Date 
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('Category', categorySchema, 'category');

export default Category;