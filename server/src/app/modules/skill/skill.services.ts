import Skill from './skill.model'

const getSkillsFromDB = async () => {
    const result = await Skill.find();
    return result;
};

const createSkillIntoDB = async (data: any, file: any) => {
    const parseData = JSON.parse(data)
    parseData.image = file.path
    const result = await Skill.create(parseData)
    return result
}

const updateSkillIntoDB = async (data: any, file: any, id: string) => {
    const parseData = JSON.parse(data)
    if (file) {
        parseData.image = file.path
    }
    const result = await Skill.findByIdAndUpdate(id, parseData, { new: true })
    return result
}

const deleteSkillFromDB = async (id: string) => {
    const result = await Skill.findByIdAndDelete(id, { new: true })
    return result
}


export const SkillServices = {
    createSkillIntoDB,
    getSkillsFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB
}
