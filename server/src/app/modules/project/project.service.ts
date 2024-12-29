import Project from "./project.model"


const getProjectsFromDB = async () => {
    const result = await Project.find()
    return result
}

const createProjectIntoDB = async (data: any, file: any) => {
    const parseData = JSON.parse(data)
    parseData.image = file.path
    const result = await Project.create(parseData)
    return result
}

const updateProjectIntoDB = async (data: any, file: any, id: string) => {
    const parseData = JSON.parse(data)
    if (file) {
        parseData.image = file.path
    }
    const result = await Project.findByIdAndUpdate(id, parseData, { new: true })
    return result
}

const deleteProjectFromDB = async (id: string) => {
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

export const ProjectServices = {
    createProjectIntoDB,
    getProjectsFromDB,
    updateProjectIntoDB,
    deleteProjectFromDB
}
