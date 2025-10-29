export const mockData = {
  login: (username, role) => {
    const users = {
      admin: {
        id: "001",
        username,
        name: "Administrator",
        email: "admin@hcmute.edu.vn",
        role: "admin",
        position: "Quản trị viên",
        permissions: ["create_plan", "edit_plan", "delete_plan", "view_all"]
      },
      headmaster: {
        id: "002",
        username,
        name: "Nguyễn Văn A",
        email: "headmaster@hcmute.edu.vn",
        role: "headmaster",
        position: "Hiệu trưởng",
        permissions: ["approve_plan", "reject_plan", "delete_plan", "view_all"]
      },
      staff: {
        id: "003",
        username,
        name: "Lê Thanh Thưởng",
        email: `${username}@hcmute.edu.vn`,
        role: "staff",
        position: "Giảng viên",
        permissions: ["view_own"]
      }
    };

    const user = users[role] || users.staff;
    return {
      token: `mocked-jwt-token-${role}`,
      user: user
    };
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
