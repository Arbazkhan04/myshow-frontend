export function getTokenFromCookie(cookieName = 'token') {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
  return match ? match[2] : undefined;
}

export function removeTokenCookie(cookieName = 'token') {
  if (typeof document === 'undefined') return;
  document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}


// Decodes a JWT and returns its payload (no verification)
export function decodeJwtPayload(token?: string): { _id: string; email: string; role: 'admin' | 'user' } | null {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    return { _id: decoded.sub, role: decoded.role, email: decoded.email };
  } catch {
    return null;
  }
}