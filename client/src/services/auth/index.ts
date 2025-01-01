"use server"
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value;
    let decodedToken = null;
    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);
    }

    const decodedUser = {
        id: decodedToken?._id,
        name: decodedToken?.name,
        email: decodedToken?.email,
        profilePhoto: decodedToken?.profilePhoto,
        designation: decodedToken?.designation,
        address: decodedToken?.address,
        description: decodedToken?.description,
        about: decodedToken?.about,
    };
    return decodedUser;
};