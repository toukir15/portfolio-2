import mongoose, { Schema, Document } from 'mongoose';
import { TProject } from './project.interface';

// Create the schema
const ProjectSchema: Schema<TProject> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    source: { type: String, required: true },
    live: { type: String, required: true },
});

// Create the model
const Project = mongoose.model<TProject>('project', ProjectSchema);

export default Project;
