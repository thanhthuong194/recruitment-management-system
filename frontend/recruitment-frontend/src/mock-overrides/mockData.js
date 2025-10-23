export const mockData = {
  login: (UsernameOrEmail) => ({
    token: "mocked-jwt-token",
    user: {
      UsernameOrEmail,
      FullName: "Lê Thanh Thưởng",
      Email: `${UsernameOrEmail}@example.com`,
    },
  }),

  register: (username) => ({
    message: "User registered successfully",
    user: {
      username,
      fullName: "Lê Thanh Thưởng",
      email: `${username}@example.com`,
    },
  }),

  forgotPassword: (email) => ({
    message: "Password reset link sent",
    email,
  }),

  resetPassword: (email) => ({
    message: "Password has been reset successfully",
    email,
  }),

  logout: () => ({
    message: "User logged out successfully",
  }),
};
