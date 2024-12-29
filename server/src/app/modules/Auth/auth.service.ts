import bcrypt from 'bcryptjs'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { createToken } from '../../utils/verifyJWT'
import { TLoginUser, TRegisterUser } from './auth.interface'
import { User } from '../user/user.model'

const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email })
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!')
  }


  // make password hash
  const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_rounds))
  const hash = bcrypt.hashSync(payload.password, salt)

  // add role, profilePhoto and hash password
  payload.password = hash

  //create new user
  const newUser = await User.create(payload)
  console.log({ newUser })
  // create bookmark collection

  // create token and sent to the  client
  const jwtPayload = {
    _id: newUser?._id.toString(),
    name: newUser?.name,
    email: newUser.email,
    profilePhoto: newUser?.profilePhoto,
    isVerified: newUser?.isVerified,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )
  return {
    accessToken,
    refreshToken,
  }
}
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }

  const matchPassword = bcrypt.compareSync(payload.password, user.password)

  //checking if the password is correct
  if (!matchPassword)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //create token and sent to the  client
  const jwtPayload = {
    _id: user?._id.toString(),
    name: user?.name,
    email: user?.email,
    profilePhoto: user?.profilePhoto,
    designation: user?.designation,
    address: user?.address,
    description: user?.description,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.findOne({ email: userData?.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }
  const matchPassword = bcrypt.compareSync(payload.oldPassword, user.password)

  //checking if the password is correct
  if (!matchPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )
  return null
}

const forgetPassword = async (
  userData: JwtPayload,
  payload: { newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.findOne({ email: userData?.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )
  return null
}

const sendForgetEmail = async (email: string) => {
  const findUser = await User.findOne({ email: email })
  if (!findUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist!')
  }

  const jwtPayload = {
    _id: findUser?._id.toString(),
    name: findUser?.name,
    email: findUser.email,
    role: findUser?.role,
    profilePhoto: findUser?.profilePhoto,
    isVerified: findUser?.isVerified,
    bookmark: findUser?.bookmark,
  }

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_send_email_expires_in as string,
  )
}

const editProfile = async (payload: any, profilePhoto: any, userId: string) => {
  const updatedData: any = {}

  if (payload.name) {
    updatedData.name = payload.name
  }
  if (payload.address) {
    updatedData.address = payload.address
  }
  if (profilePhoto?.path) {
    updatedData.profilePhoto = profilePhoto.path
  }
  await User.findByIdAndUpdate(userId, updatedData)
  const user = await User.findById(userId)

  const jwtPayload = {
    _id: user?._id.toString(),
    name: user?.name,
    email: user.email,
    role: user?.role,
    profilePhoto: user?.profilePhoto,
    isVerified: user?.isVerified,
    bookmark: user?.bookmark,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )
  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (email: string) => {
  // checking if the user is exist
  const user = await User.findOne({ email: email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }
  const jwtPayload = {
    _id: user?._id.toString(),
    name: user?.name,
    email: user.email,
    role: user?.role,
    profilePhoto: user?.profilePhoto,
    isVerified: user?.isVerified,
    bookmark: user?.bookmark,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  editProfile,
  sendForgetEmail,
  forgetPassword,
}
