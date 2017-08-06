/* This is a very basic test to validate the server response - in a real world application a tool
such as Joi could be used for more thorough and reusable validation */
const isServerJsonValid = serverJson =>
  serverJson &&
  serverJson.city &&
  typeof serverJson.city.name !== 'undefined' &&
  typeof serverJson.city.country !== 'undefined' &&
  serverJson.list &&
  serverJson.list.length;

export default isServerJsonValid;
