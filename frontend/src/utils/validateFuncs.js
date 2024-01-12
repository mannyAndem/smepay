export const validateString = (string) => {
  if (string.length === 0) {
    return false;
  }

  return true;
};

export const validateEmail = (emailString) => {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
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
