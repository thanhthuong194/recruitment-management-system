/**
 * The PlansController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/PlansService');
const createRecruitmentPlan = async (request, response) => {
  await Controller.handleRequest(request, response, service.createRecruitmentPlan);
};

const getAllPlans = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllPlans);
};

const getPlanById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getPlanById);
};

const updatePlanStatus = async (request, response) => {
  await Controller.handleRequest(request, response, service.updatePlanStatus);
};


module.exports = {
  createRecruitmentPlan,
  getAllPlans,
  getPlanById,
  updatePlanStatus,
};
