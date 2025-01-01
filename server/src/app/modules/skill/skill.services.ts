import { User } from '../user/user.model';
import Skill from './skill.model'

const getSkillsFromDB = async () => {
    const result = await Skill.find();  // Get all skills from DB

    // Group skills by category
    const groupedByCategory = result.reduce((acc: any, skill) => {
        // Check if the category already exists in the accumulator, if not, initialize it
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        // Push the current skill into the respective category
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return groupedByCategory;
};


const createSkillIntoDB = async (data: any, file: any, userId: string) => {
    const parseData = JSON.parse(data); // Parse the input data
    parseData.image = file.path; // Add the file path to the data
    const result = await Skill.create(parseData);

    await User.findByIdAndUpdate(
        userId,
        {
            $push: { skill: result._id },
        },
        { new: true }
    );

    return result;
};

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
