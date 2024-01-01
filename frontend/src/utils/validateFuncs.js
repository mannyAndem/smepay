export const validateString = (string) => {
  if (string.length === 0) {
    return false;
  }

  return true;
};

export const validateEmail = (emailString) => {
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (emailString.length === 0) {
    return false;
  }
  if (!emailRegex.test(emailString)) {
    return false;
  }

  return true;
};

export const validatePassword = (passwordString) => {
  if (passwordString.length < 6) {
    return false;
  }

  return true;
};
