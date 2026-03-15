const API_URL = `${import.meta.env.VITE_API_URL}/api/stats/dashboard`

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch stats");
  }

  return data;
};

export const getDashboardStats = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
};