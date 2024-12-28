import { Schema, model, models } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: 1, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true },
)

export const User = models.User || model<TUser>('User', userSchema)
