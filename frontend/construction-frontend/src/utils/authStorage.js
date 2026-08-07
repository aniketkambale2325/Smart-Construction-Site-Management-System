const AUTH_STORAGE_KEYS = [
  "token",
  "refreshToken",
  "role",
  "userId",
  "username",
  "user",
];

export function getUsernameFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

export function clearAuthStorage() {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}
