function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(cookie: string | undefined, name: string) {
  const value = cookie?.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? decodeURI(value[2]) : null;
}

export {
  setCookie,
  getCookie
}
