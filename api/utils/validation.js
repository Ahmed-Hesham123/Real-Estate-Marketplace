// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate strong password (at least 8 characters including one uppercase, one lowercase, one digit, and one special character)
export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate username (contains at least one number and one uppercase character)
export const validateUsername = (username) => {
  const usernameRegex = /^(?=.*[A-Z])(?=.*\d)/;
  return usernameRegex.test(username);
};
