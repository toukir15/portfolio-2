import { getCurrentUser } from "../services/auth"

export const getUser = async () => {
    return await getCurrentUser()
} 