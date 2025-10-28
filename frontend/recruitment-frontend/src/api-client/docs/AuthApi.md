# RecruitmentManagementSystemApi.AuthApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**forgotPassword**](AuthApi.md#forgotPassword) | **POST** /api/auth/forgot-password | Forgot password
[**loginUser**](AuthApi.md#loginUser) | **POST** /api/auth/login | User login
[**refreshToken**](AuthApi.md#refreshToken) | **POST** /api/auth/refresh | Refresh access token
[**resetPassword**](AuthApi.md#resetPassword) | **POST** /api/auth/reset-password | Reset password



## forgotPassword

> ForgotPassword200Response forgotPassword(forgotPasswordRequest)

Forgot password

Send password reset link to user email

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.AuthApi();
let forgotPasswordRequest = new RecruitmentManagementSystemApi.ForgotPasswordRequest(); // ForgotPasswordRequest | 
apiInstance.forgotPassword(forgotPasswordRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **forgotPasswordRequest** | [**ForgotPasswordRequest**](ForgotPasswordRequest.md)|  | 

### Return type

[**ForgotPassword200Response**](ForgotPassword200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## loginUser

> AuthResponse loginUser(loginRequest)

User login

Authenticate user and return access token

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.AuthApi();
let loginRequest = new RecruitmentManagementSystemApi.LoginRequest(); // LoginRequest | 
apiInstance.loginUser(loginRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **loginRequest** | [**LoginRequest**](LoginRequest.md)|  | 

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## refreshToken

> RefreshToken200Response refreshToken(refreshTokenRequest)

Refresh access token

Refresh a new access token using a valid refresh token

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.AuthApi();
let refreshTokenRequest = new RecruitmentManagementSystemApi.RefreshTokenRequest(); // RefreshTokenRequest | 
apiInstance.refreshToken(refreshTokenRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **refreshTokenRequest** | [**RefreshTokenRequest**](RefreshTokenRequest.md)|  | 

### Return type

[**RefreshToken200Response**](RefreshToken200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## resetPassword

> ForgotPassword200Response resetPassword(resetPasswordRequest)

Reset password

Reset user password using reset token

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.AuthApi();
let resetPasswordRequest = new RecruitmentManagementSystemApi.ResetPasswordRequest(); // ResetPasswordRequest | 
apiInstance.resetPassword(resetPasswordRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resetPasswordRequest** | [**ResetPasswordRequest**](ResetPasswordRequest.md)|  | 

### Return type

[**ForgotPassword200Response**](ForgotPassword200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

