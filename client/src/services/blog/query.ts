import envConfig from "@/src/config/envConfig";

export const getBlogs = async () => {
    try {
        const res = await fetch(
            `${envConfig.server_url}/api/v1/blog`
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                `Failed to fetch projects: ${errorData.message || res.status}`
            );
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
};
export const getBlog = async (id: string) => {
    try {
        const res = await fetch(
            `${envConfig.server_url}/api/v1/blog/${id}`
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                `Failed to fetch projects: ${errorData.message || res.status}`
            );
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
};
