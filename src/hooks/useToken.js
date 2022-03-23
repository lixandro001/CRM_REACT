export const useToken = () => {
  const token = localStorage.getItem('token');
  const expireAt = parseInt(localStorage.getItem('expireAt'), 10);
  const currentTime = new Date().getTime();
  let isAuth = true;

  console.log(currentTime);
  if (token && expireAt) {
    if (currentTime >= expireAt) {
      isAuth = false;
    } else {
      isAuth = true;
    }
  } else {
    isAuth = false;
  }
  return {
    isAuth
  };
};
