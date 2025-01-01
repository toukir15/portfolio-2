import mongoose, { Schema } from 'mongoose';
import { TSocial } from './social.interface';

// Create the schema
const TSocialSchema: Schema<TSocial> = new Schema({
    website: { type: String, required: false },
    email: { type: String, required: false },
    linkedin: { type: String, required: false },
    github: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    whatsApp: { type: String, required: false },
    twitter: { type: String, required: false },
});

// Create the model
const Social = mongoose.model<TSocial>('social', TSocialSchema);

export default Social;
