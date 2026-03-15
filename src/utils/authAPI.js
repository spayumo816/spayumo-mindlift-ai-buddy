const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const handleResponse = async (response, fallbackMessage) => {
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(fallbackMessage);
  }

  if (!response.ok) {
    throw new Error(data.error || fallbackMessage);
  }

  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  return handleResponse(response, "Registration failed");
};

export const verifyEmail = async (verificationData) => {
  const response = await fetch(`${API_URL}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(verificationData),
  });

  return handleResponse(response, "Email verification failed");
};

export const resendVerificationOTP = async (email) => {
  const response = await fetch(`${API_URL}/resend-verification-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  return handleResponse(response, "Failed to resend verification OTP");
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  return handleResponse(response, "Login failed");
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse(response, "Logout failed");
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "Failed to get current user");
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  return handleResponse(response, "Failed to send reset password OTP");
};

export const resetPassword = async (resetData) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(resetData),
  });

  return handleResponse(response, "Failed to reset password");
};