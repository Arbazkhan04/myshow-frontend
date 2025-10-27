export function getTokenFromCookie(cookieName = 'token') {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
  return match ? match[2] : undefined;
}

export function removeTokenCookie(cookieName = 'token') {
  if (typeof document === 'undefined') return;
  document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}