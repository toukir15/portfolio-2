import httpStatus from 'http-status'
import { User } from './user.model'
import config from '../../config'
import { TUser } from './user.interface'
import bcrypt from 'bcryptjs'
import AppError from '../../errors/AppError'

const createUserIntoDB = async (payload: TUser) => {
  // check user is exist or not
  const isUserExist = await User.findOne({ email: payload.email })
  console.log(payload)
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already exist')
  }

  // make password hash
  const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_rounds))
  const hash = bcrypt.hashSync(payload.password, salt)
  if (!hash) {
    throw new AppError(httpStatus.CONFLICT, 'Conflict with user credantial')
  }
  payload.password = hash
  const result = await User.create(payload)

  return result
}


const getUserFromDB = async () => {
  const result = await User.find()
  return result[0]
}

const updateUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true },
  )
  return result
}

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getUserFromDB,
}
