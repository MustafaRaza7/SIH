// import api from "./api"; // uncomment when wiring the real Gateway
import { USERS, wait } from "./dummyData";
import { saveSession, clearSession, getStoredUser, getToken } from "../utils/token";

const USE_DUMMY_DATA = true;

export async function login({ email, password }) {
  if (USE_DUMMY_DATA) {
    await wait(500);
    const user = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      const err = new Error("Invalid email or password.");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }
    const { password: _pw, ...safeUser } = user;
    const fakeToken = `dummy.${btoa(JSON.stringify({ sub: user.id, role: user.role }))}.token`;
    saveSession(fakeToken, safeUser);
    return safeUser;
  }
  // const { data } = await api.post("/auth/login", { email, password });
  // saveSession(data.access_token, data.user);
  // return data.user;
}

export async function register({ name, email, password }) {
  if (USE_DUMMY_DATA) {
    await wait(600);
    const exists = USERS.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      const err = new Error("An account with this email already exists.");
      err.code = "DUPLICATE_EMAIL";
      throw err;
    }
    const newUser = {
      id: `u-${Math.floor(Math.random() * 9000 + 1000)}`,
      name,
      email,
      role: "citizen",
      citizenId: `c-${Math.floor(Math.random() * 9000 + 1000)}`,
    };
    const fakeToken = `dummy.${btoa(JSON.stringify({ sub: newUser.id, role: newUser.role }))}.token`;
    saveSession(fakeToken, newUser);
    return newUser;
  }
  // const { data } = await api.post("/auth/register", { name, email, password });
  // return data;
}

export function logout() {
  clearSession();
}

export function currentUser() {
  return getStoredUser();
}

export function isAuthenticated() {
  return Boolean(getToken());
}
