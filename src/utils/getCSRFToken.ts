export const getCsrfToken = () => {
  const match = document.cookie.match(new RegExp('(^|; )csrfToken=([^;]+)'));
  return match ? match[2] : null;
}
