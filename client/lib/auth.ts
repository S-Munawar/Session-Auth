// This file is no longer needed since we are using HTTP-only cookies to store the auth token not localStorage.
// Keeping it here for reference.

// const TOKEN_KEY = 'auth_token'; // Key used to store the auth token in localStorage

// export function saveToken(token: string) {
//   if (typeof window === 'undefined') return;
//   localStorage.setItem(TOKEN_KEY, token);
// }

// export function getToken(): string | null {
//   if (typeof window === 'undefined') return null;
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function clearToken() {
//   if (typeof window === 'undefined') return;
//   localStorage.removeItem(TOKEN_KEY);
// }
