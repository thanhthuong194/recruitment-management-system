# RecruitmentManagementSystemApi.UsersApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](UsersApi.md#createUser) | **POST** /api/users | Create new user
[**deleteUserById**](UsersApi.md#deleteUserById) | **DELETE** /api/users/{id} | Delete user by ID
[**getAllUsers**](UsersApi.md#getAllUsers) | **GET** /api/users | Get all users
[**getMyProfile**](UsersApi.md#getMyProfile) | **GET** /api/users/me | Get personal profile
[**getUserById**](UsersApi.md#getUserById) | **GET** /api/users/{id} | Get user by ID
[**searchUsers**](UsersApi.md#searchUsers) | **GET** /api/users/search | Search users
[**updateMyProfile**](UsersApi.md#updateMyProfile) | **PUT** /api/users/me | Update personal profile
[**updateUserById**](UsersApi.md#updateUserById) | **PUT** /api/users/{id} | Update user by ID (admin only)



## createUser

> ForgotPassword200Response createUser(userCreateRequest)

Create new user

Add a new user to the system (admin only)

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let userCreateRequest = new RecruitmentManagementSystemApi.UserCreateRequest(); // UserCreateRequest | 
apiInstance.createUser(userCreateRequest, (error, data, response) => {
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
 **userCreateRequest** | [**UserCreateRequest**](UserCreateRequest.md)|  | 

### Return type

[**ForgotPassword200Response**](ForgotPassword200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUserById

> ForgotPassword200Response deleteUserById(id)

Delete user by ID

Remove a user from the system by their ID

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let id = "id_example"; // String | 
apiInstance.deleteUserById(id, (error, data, response) => {
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
 **id** | **String**|  | 

### Return type

[**ForgotPassword200Response**](ForgotPassword200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getAllUsers

> [UserBasicInfo] getAllUsers(opts)

Get all users

Retrieve list of all users (basic info only, excluding sensitive data)

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let opts = {
  'page': 2, // Number | The page number to retrieve in the paginated results.
  'limit': 25 // Number | The maximum number of items to return per page.
};
apiInstance.getAllUsers(opts, (error, data, response) => {
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
 **page** | **Number**| The page number to retrieve in the paginated results. | [optional] [default to 1]
 **limit** | **Number**| The maximum number of items to return per page. | [optional] [default to 10]

### Return type

[**[UserBasicInfo]**](UserBasicInfo.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getMyProfile

> User getMyProfile()

Get personal profile

Retrieve the authenticated user&#39;s personal profile

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
apiInstance.getMyProfile((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**User**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getUserById

> User getUserById(id)

Get user by ID

Retrieve detailed information of a specific user by their ID

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let id = "id_example"; // String | 
apiInstance.getUserById(id, (error, data, response) => {
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
 **id** | **String**|  | 

### Return type

[**User**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## searchUsers

> [UserBasicInfo] searchUsers(opts)

Search users

Search for users by ID, email, or phone number

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let opts = {
  'id': "id_example", // String | 
  'email': "email_example", // String | 
  'phone': "phone_example" // String | 
};
apiInstance.searchUsers(opts, (error, data, response) => {
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
 **id** | **String**|  | [optional] 
 **email** | **String**|  | [optional] 
 **phone** | **String**|  | [optional] 

### Return type

[**[UserBasicInfo]**](UserBasicInfo.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateMyProfile

> ForgotPassword200Response updateMyProfile(userSelfUpdateRequest)

Update personal profile

Update user’s own contact info (username, email, phone, address)

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let userSelfUpdateRequest = new RecruitmentManagementSystemApi.UserSelfUpdateRequest(); // UserSelfUpdateRequest | 
apiInstance.updateMyProfile(userSelfUpdateRequest, (error, data, response) => {
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
 **userSelfUpdateRequest** | [**UserSelfUpdateRequest**](UserSelfUpdateRequest.md)|  | 

### Return type

[**ForgotPassword200Response**](ForgotPassword200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateUserById

> ForgotPassword200Response updateUserById(id, userAdminUpdateRequest)

Update user by ID (admin only)

Update user&#39;s department, position, or role (restricted to admin)

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.UsersApi();
let id = "id_example"; // String | 
let userAdminUpdateRequest = new RecruitmentManagementSystemApi.UserAdminUpdateRequest(); // UserAdminUpdateRequest | 
apiInstance.updateUserById(id, userAdminUpdateRequest, (error, data, response) => {
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
 **id** | **String**|  | 
 **userAdminUpdateRequest** | [**UserAdminUpdateRequest**](UserAdminUpdateRequest.md)|  | 

### Return type

[**ForgotPassword200Response**](ForgotPassword200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

