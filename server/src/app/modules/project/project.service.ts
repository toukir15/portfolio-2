import Project from "./project.model"



const createProjectIntoDB = async (data: any, file: any) => {
    const parseData = JSON.parse(data)
    parseData.image = file.path
    const result = await Project.create(parseData)
    return result
}


const getProjectsFromDB = async () => {
    const result = await Project.find()
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

export const ProjectServices = {
    createProjectIntoDB,
    getProjectsFromDB
}
