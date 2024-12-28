export const getUser = async () => {
  try {
    const fetchOption = {
      next: {
        tags: ["user"],
      },
    };

    const res = await fetch(
      `http://localhost:5000/api/v1/users`,
      // `https://protfolioserver.vercel.app/api/v1/users`,
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
