const API_URL = `${import.meta.env.VITE_API_URL}/api/notes`

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

export const createNote = async (noteData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(noteData),
  });

  return handleResponse(response);
};

export const getUserNotes = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
};

export const getNoteById = async (noteId) => {
  const response = await fetch(`${API_URL}/${noteId}`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
};

export const updateNote = async (noteId, noteData) => {
  const response = await fetch(`${API_URL}/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(noteData),
  });

  return handleResponse(response);
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`${API_URL}/${noteId}`, {
    method: "DELETE",
    credentials: "include",
  });

  return handleResponse(response);
};