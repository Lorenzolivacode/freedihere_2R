const KEY = "activeUserId";

export function setActiveUser(id: string) {
  localStorage.setItem(KEY, id);
}

export function getActiveUser(): string | null {
  return localStorage.getItem(KEY);
}

export function clearActiveUser() {
  localStorage.removeItem(KEY);
}
