export function getThemeCookie(): "dark" | "light" | null {
  const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
  if (!match) return null;
  const value = decodeURIComponent(match[1] || "");
  if (value === "dark" || value === "light") {
    return value;
  }
  return null;
}
