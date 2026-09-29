// Dummy-data mode: no real JWT is issued yet, but the shape mirrors what the
// Gateway will eventually return, so swapping in the real API later only
// means changing services/*.js — nothing in components should need to change.

const TOKEN_KEY = "cc_token";
const USER_KEY = "cc_user";

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
