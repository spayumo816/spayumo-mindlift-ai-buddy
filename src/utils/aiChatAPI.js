const CHAT_API_URL = `${import.meta.env.VITE_API_URL}/api/ai/chat`

const SAVE_NOTE_API_URL = `${import.meta.env.VITE_API_URL}/api/ai/save-note`

const SAVE_STUDY_PLAN_API_URL = `${import.meta.env.VITE_API_URL}/api/ai/save-study-plan`

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

export const sendAIMessage = async (message) => {
  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  return handleResponse(response);
};

export const getAIChatHistory = async () => {
  const response = await fetch(CHAT_API_URL, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
};

export const clearAIChatHistory = async () => {
  const response = await fetch(CHAT_API_URL, {
    method: "DELETE",
    credentials: "include",
  });

  return handleResponse(response);
};

export const saveAIMessageToNotes = async (message) => {
  const response = await fetch(SAVE_NOTE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  return handleResponse(response);
};

export const saveAIMessageToStudyPlan = async (message) => {
  const response = await fetch(`${SAVE_STUDY_PLAN_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  return handleResponse(response);
};