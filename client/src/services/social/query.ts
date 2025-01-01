import envConfig from "@/src/config/envConfig";

export const getSocial = async () => {
    try {
        const fetchOption = {
            next: {
                tags: ["user"],
            },
        };

        const res = await fetch(
            `${envConfig.server_url}/api/v1/social`,
            fetchOption
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                `Failed to fetch products: ${errorData.message || res.status}`
            );
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
