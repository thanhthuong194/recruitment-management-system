/**
 * The UsersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UsersService');
const createUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.createUser);
};

const deleteUserById = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteUserById);
};

const getAllUsers = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllUsers);
};

const getMyProfile = async (request, response) => {
  await Controller.handleRequest(request, response, service.getMyProfile);
};

const getUserById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getUserById);
};

const searchUsers = async (request, response) => {
  await Controller.handleRequest(request, response, service.searchUsers);
};

const updateMyProfile = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateMyProfile);
};

const updateUserById = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateUserById);
};


module.exports = {
  createUser,
  deleteUserById,
  getAllUsers,
  getMyProfile,
  getUserById,
  searchUsers,
  updateMyProfile,
  updateUserById,
};
