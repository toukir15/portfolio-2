import { Types } from "mongoose"

export type TUser = {
  name: string
  email: string
  password: string
  address: string
  designation: string
  description: string
  about: string
  social: Types.ObjectId
  skill: Types.ObjectId[]
}