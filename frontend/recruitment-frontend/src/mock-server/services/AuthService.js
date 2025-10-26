/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Forgot password
* Send password reset link to user email
*
* forgotPasswordRequest ForgotPasswordRequest 
* returns forgotPassword_200_response
* */
const forgotPassword = ({ forgotPasswordRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        forgotPasswordRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* User login
* Authenticate user and return access token
*
* loginRequest LoginRequest 
* returns AuthResponse
* */
const loginUser = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        loginRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Refresh access token
* Refresh a new access token using a valid refresh token
*
* refreshTokenRequest RefreshTokenRequest 
* returns refreshToken_200_response
* */
const refreshToken = ({ refreshTokenRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        refreshTokenRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Reset password
* Reset user password using reset token
*
* resetPasswordRequest ResetPasswordRequest 
* returns forgotPassword_200_response
* */
const resetPassword = ({ resetPasswordRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        resetPasswordRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  forgotPassword,
  loginUser,
  refreshToken,
  resetPassword,
};
