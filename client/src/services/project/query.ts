export const getProjects = async () => {
    try {
        const res = await fetch(
            `http://localhost:5000/api/v1/project`
            // `https://protfolioserver.vercel.app/api/v1/project`
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
