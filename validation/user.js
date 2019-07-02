const joi = require('@hapi/joi');

// Auth Login
const authLoginValidation = function(data){
	var schema = {
		user_email: joi.string().required().email().min(6),
		user_password: joi.string().required().min(6),
	}

	return joi.validate(data, schema);
};

module.exports.authLoginValidation = authLoginValidation;

// Auth Register
const authRegValidation = function(data){
	var schema = {
		user_name: joi.string().required().min(3),
		user_email: joi.string().required().email().min(6),
		user_password: joi.string().required().min(6),
	}

	return joi.validate(data, schema);
};

module.exports.authRegValidation = authRegValidation;

// Employee Register
const empRegValidation = function(data){
	var schema = {
		emp_name: joi.string().required().min(3),
		emp_email: joi.string().required().email().min(6),
		emp_password: joi.string().required().min(6),
		emp_mobile: joi.string().required().min(10).max(10),
	}

	return joi.validate(data, schema);
};

module.exports.empRegValidation = empRegValidation;


