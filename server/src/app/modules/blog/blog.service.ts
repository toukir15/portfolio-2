import Blog from "./blog.model"
import Project from "./blog.model"


const getBlogsFromDB = async () => {
    const result = await Blog.find()
    return result
}
const getBlogFromDB = async (id: string) => {
    const result = await Blog.findById(id)
    return result
}

const createBlogIntoDB = async (data: any, file: any, authorName: string) => {
    const parseData = JSON.parse(data)
    parseData.image = file.path
    parseData.author = authorName
    const result = await Blog.create(parseData)
    return result
}

const updateBlogIntoDB = async (data: any, file: any, id: string) => {
    const parseData = JSON.parse(data)
    if (file) {
        parseData.image = file.path
    }
    const result = await Project.findByIdAndUpdate(id, parseData, { new: true })
    return result
}

const deleteBlog = async (id: string) => {
    const result = await Project.findByIdAndDelete(id)
    return result
}

// const updateUserIntoDB = async (id: string) => {
//     const result = await User.findByIdAndUpdate(
//         id,
//         { role: 'admin' },
//         { new: true },
//     )
//     return result
// }

export const BlogServices = {
    createBlogIntoDB,
    getBlogsFromDB,
    updateBlogIntoDB,
    deleteBlog,
    getBlogFromDB
}
