# RecruitmentManagementSystemApi.PlansApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRecruitmentPlan**](PlansApi.md#createRecruitmentPlan) | **POST** /api/plans/create | Submit recruitment plan
[**getAllPlans**](PlansApi.md#getAllPlans) | **GET** /api/plans | Get all recruitment plans
[**getPlanById**](PlansApi.md#getPlanById) | **GET** /api/plans/{id} | Get plan by ID
[**updatePlanStatus**](PlansApi.md#updatePlanStatus) | **PATCH** /api/plans/{id}/status | Update plan status



## createRecruitmentPlan

> PlanResponse createRecruitmentPlan(planCreateRequest)

Submit recruitment plan

Allows a Unit Manager to submit a recruitment plan proposal for approval.

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.PlansApi();
let planCreateRequest = new RecruitmentManagementSystemApi.PlanCreateRequest(); // PlanCreateRequest | 
apiInstance.createRecruitmentPlan(planCreateRequest, (error, data, response) => {
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
 **planCreateRequest** | [**PlanCreateRequest**](PlanCreateRequest.md)|  | 

### Return type

[**PlanResponse**](PlanResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getAllPlans

> GetAllPlans200Response getAllPlans(opts)

Get all recruitment plans

Retrieve a paginated list of all recruitment plans submitted by unit managers.

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.PlansApi();
let opts = {
  'page': 2, // Number | The page number to retrieve in the paginated results.
  'limit': 25, // Number | The maximum number of items to return per page.
  'sortBy': "createdAt", // String | The field used to sort the results. Supported fields depend on the endpoint (e.g., 'createdAt', 'fullName', 'status').
  'sortOrder': "desc", // String | The order of sorting (ascending or descending).
  'keyword': "Thương" // String | A general search term to filter resources across common fields (e.g., name, email, title).
};
apiInstance.getAllPlans(opts, (error, data, response) => {
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
 **sortBy** | **String**| The field used to sort the results. Supported fields depend on the endpoint (e.g., &#39;createdAt&#39;, &#39;fullName&#39;, &#39;status&#39;). | [optional] 
 **sortOrder** | **String**| The order of sorting (ascending or descending). | [optional] 
 **keyword** | **String**| A general search term to filter resources across common fields (e.g., name, email, title). | [optional] 

### Return type

[**GetAllPlans200Response**](GetAllPlans200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getPlanById

> PlanResponse getPlanById(id)

Get plan by ID

Retrieve details of a specific recruitment plan.

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.PlansApi();
let id = "plan-001"; // String | 
apiInstance.getPlanById(id, (error, data, response) => {
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

[**PlanResponse**](PlanResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updatePlanStatus

> PlanResponse updatePlanStatus(id, updatePlanStatusRequest)

Update plan status

Rector or Personnel Manager updates the status (e.g., APPROVED / REJECTED).

### Example

```javascript
import RecruitmentManagementSystemApi from 'recruitment_management_system_api';
let defaultClient = RecruitmentManagementSystemApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new RecruitmentManagementSystemApi.PlansApi();
let id = "plan-001"; // String | 
let updatePlanStatusRequest = new RecruitmentManagementSystemApi.UpdatePlanStatusRequest(); // UpdatePlanStatusRequest | 
apiInstance.updatePlanStatus(id, updatePlanStatusRequest, (error, data, response) => {
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
 **updatePlanStatusRequest** | [**UpdatePlanStatusRequest**](UpdatePlanStatusRequest.md)|  | 

### Return type

[**PlanResponse**](PlanResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

