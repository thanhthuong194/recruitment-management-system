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

    // Ưu tiên phân biệt theo role hoặc username
    if (username === "headmaster" || username === "hieu_truong" || role === "headmaster") {
      return {
        token: "mocked-jwt-token-headmaster",
        user: users.headmaster
      };
    }

    if (role === "admin" || username === "admin") {
      return {
        token: "mocked-jwt-token-admin",
        user: users.admin
      };
    }

    // Mặc định là staff
    return {
      token: "mocked-jwt-token-staff",
      user: users.staff
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
