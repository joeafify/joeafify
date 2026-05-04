/**
 * Cookie utility functions for theme and color preferences
 */

const ONE_YEAR_IN_SECONDS = 31536000; // 365 days

export function setCookie(
  name: string,
  value: string,
  maxAgeSeconds: number = ONE_YEAR_IN_SECONDS
): void {
  try {
    document.cookie = `${name}=${value};path=/;max-age=${maxAgeSeconds};SameSite=Lax`;
  } catch (error) {
    console.warn(`Failed to set cookie ${name}:`, error);
  }
}

export function getCookie(name: string): string | null {
  try {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return cookie.substring(nameEQ.length);
      }
    }
  } catch (error) {
    console.warn(`Failed to get cookie ${name}:`, error);
  }

  return null;
}

export function deleteCookie(name: string): void {
  try {
    document.cookie = `${name}=;path=/;max-age=0`;
  } catch (error) {
    console.warn(`Failed to delete cookie ${name}:`, error);
  }
}
