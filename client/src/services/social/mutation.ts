export const sendEmail = async (data: any) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/social/send-email`,
      // `https://protfolioserver.vercel.app/api/v1/social/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to send email: ${errorData.message || res.status}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};