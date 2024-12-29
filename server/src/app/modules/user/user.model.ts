import { Schema, model, models } from 'mongoose'
import { TRegisterUser } from '../Auth/auth.interface'

const userSchema = new Schema<TRegisterUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: 1, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    social: { type: Schema.ObjectId, default: null, ref: 'Social' },
    skill: { type: Schema.ObjectId, default: null, ref: 'Skill' },
  },
  { timestamps: true },
)

export const User = models.User || model<TRegisterUser>('User', userSchema)
