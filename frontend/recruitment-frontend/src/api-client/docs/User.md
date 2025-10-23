# RecruitmentManagementSystemApi.User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  | [readonly] 
**username** | **String** |  | 
**email** | **String** |  | 
**phone** | **String** |  | 
**fullName** | **String** |  | 
**role** | **String** |  | 
**status** | **String** |  | 
**isVerified** | **Boolean** | Indicates if the user&#39;s email is verified | [readonly] 
**createdAt** | **Date** |  | [readonly] 
**updatedAt** | **Date** |  | [readonly] 



## Enum: RoleEnum


* `ADMIN` (value: `"ADMIN"`)

* `RECRUITER` (value: `"RECRUITER"`)

* `RECTOR` (value: `"RECTOR"`)

* `CANDIDATE` (value: `"CANDIDATE"`)





## Enum: StatusEnum


* `ACTIVE` (value: `"ACTIVE"`)

* `INACTIVE` (value: `"INACTIVE"`)

* `PENDING` (value: `"PENDING"`)




