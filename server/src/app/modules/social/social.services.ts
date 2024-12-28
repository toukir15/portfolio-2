import { TSocial } from './social.interface'
import Social from './social.model'

const createSocialIntoDB = async (payload: TSocial) => {
    const result = await Social.create(payload)
    return result
}

const getSocialFromDB = async () => {
    const result = await Social.find().select({
        _id: 0,
        __v: 0,
    });
    return result[0];
};

const sendEmailToMe = async (payload: any) => {
    const json = JSON.stringify({ ...payload, access_key: "6d93e15f-4c83-4ce8-ba81-fd0514297039" });
    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    });
}


// const getUserFromDB = async (userId: string) => {
//     // Find the user by ID
//     const findUser = await User.findById(userId)

//     if (!findUser) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
//     }

//     const result = await User.findById(userId)
//     return result
// }

// const updateUserIntoDB = async (id: string) => {
//     const result = await User.findByIdAndUpdate(
//         id,
//         { role: 'admin' },
//         { new: true },
//     )
//     return result
// }

export const SocialServices = {
    createSocialIntoDB,
    sendEmailToMe,
    getSocialFromDB
}
