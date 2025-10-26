/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Submit recruitment plan
* Allows a Unit Manager to submit a recruitment plan proposal for approval.
*
* planCreateRequest PlanCreateRequest 
* returns PlanResponse
* */
const createRecruitmentPlan = ({ planCreateRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        planCreateRequest,
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
* Get all recruitment plans
* Retrieve a paginated list of all recruitment plans submitted by unit managers.
*
* page Integer The page number to retrieve in the paginated results. (optional)
* limit Integer The maximum number of items to return per page. (optional)
* sortBy String The field used to sort the results. Supported fields depend on the endpoint (e.g., 'createdAt', 'fullName', 'status'). (optional)
* sortOrder String The order of sorting (ascending or descending). (optional)
* keyword String A general search term to filter resources across common fields (e.g., name, email, title). (optional)
* returns getAllPlans_200_response
* */
const getAllPlans = ({ page, limit, sortBy, sortOrder, keyword }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        page,
        limit,
        sortBy,
        sortOrder,
        keyword,
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
* Get plan by ID
* Retrieve details of a specific recruitment plan.
*
* id String 
* returns PlanResponse
* */
const getPlanById = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
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
* Update plan status
* Rector or Personnel Manager updates the status (e.g., APPROVED / REJECTED).
*
* id String 
* updatePlanStatusRequest UpdatePlanStatusRequest 
* returns PlanResponse
* */
const updatePlanStatus = ({ id, updatePlanStatusRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        updatePlanStatusRequest,
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
  createRecruitmentPlan,
  getAllPlans,
  getPlanById,
  updatePlanStatus,
};
