export const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.access : null;
};

export const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.refresh : null;
};

export const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    user = {};  // Create a new user object if not present
  }
  user.access = token;  // Update the access token
  localStorage.setItem("user", JSON.stringify(user));
};

export const setUserData = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const removeUser = (navigate) => {
  localStorage.removeItem("user");
  // Check if navigate function is provided before calling it
  if (navigate) {
    navigate("/");
  }
};
