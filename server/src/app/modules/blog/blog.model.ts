import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

// Create the schema
const BlogSchema: Schema<TBlog> = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: [String], required: true },
    author: { type: String, required: true },
}, { timestamps: true });

// Create the model
const Blog = mongoose.model<TBlog>('blog', BlogSchema);

export default Blog;
