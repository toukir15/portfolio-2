import mongoose, { Schema } from 'mongoose';
import { TSkill } from './skill.interface';

// Create the schema
const TSkillSchema: Schema<TSkill> = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
});

// Create the model
const Skill = mongoose.model<TSkill>('skill', TSkillSchema);

export default Skill;
