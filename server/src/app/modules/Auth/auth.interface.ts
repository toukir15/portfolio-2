import { Types } from "mongoose"

export type TLoginUser = {
  email: string
  password: string
}

export type TRegisterUser = {
  name: string
  email: string
  password: string
  address: string
  designation: string
  description: string
  profilePhoto: string
  about: string
  skill: Types.ObjectId
  social: Types.ObjectId
}
