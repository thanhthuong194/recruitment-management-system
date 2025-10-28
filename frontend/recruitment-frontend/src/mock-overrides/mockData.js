export const mockData = {
  login: (username) => {
    // Tài khoản hiệu trưởng
    if (username === "headmaster" || username === "hieu_truong") {
      return {
        token: "mocked-jwt-token-headmaster",
        user: {
          id: "001",
          username,
          name: "Nguyễn Văn A",
          email: "headmaster@hcmute.edu.vn",
          role: "headmaster",
          position: "Hiệu trưởng"
        }
      };
    }
    
    // Tài khoản thường
    return {
      token: "mocked-jwt-token-user",
      user: {
        id: "002",
        username,
        name: "Lê Thanh Thưởng",
        email: `${username}@hcmute.edu.vn`,
        role: "staff",
        position: "Giảng viên"
      }
    };
  },

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
