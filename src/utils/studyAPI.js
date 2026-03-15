const API_URL = `${import.meta.env.VITE_API_URL}/api/study-plan`

const handleResponse = async (response) => {
  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.error || "Request Failed")
  }

  return data;
}

export const createStudyPlan = async (studyPlanData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(studyPlanData)
  });

  return handleResponse(response);
}

export const getAllStudyPlan = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response);
}

export const getStudyPlanById = async (studyPlanId) => {
  const response = await fetch(`${API_URL}/${studyPlanId}`, {
    method: "GET",
    credentials: "include"
  })

  return handleResponse(response)
}

export const updateStudyPlan = async (studyPlanId, studyPlanData) => {
  const response = await fetch(`${API_URL}/${studyPlanId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(studyPlanData),
  });

  return handleResponse(response);
};

export const deleteStudyPlan = async (studyPlanId) => {
  const response = await fetch(`${API_URL}/${studyPlanId}`, {
    method: "DELETE",
    credentials: "include",
  });

  return handleResponse(response);
};

export const completeStudyPlan = async (studyPlanId) => {
  const response = await fetch(`${API_URL}/${studyPlanId}/complete`, {
    method: "PATCH",
    credentials: "include",
  });

  return handleResponse(response);
};