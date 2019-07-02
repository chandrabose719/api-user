const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const Auth = require('../models/authentication');

// Validation
const { authLoginValidation, authRegValidation } = require('../validation/user');

// Login
router.post('/login', function(req, res, next){
	var check_email = req.body.user_email;
	var check_password = req.body.user_password;
	var validation_result = authLoginValidation(req.body);
	if(validation_result.error){
		res.status(400).json({
			result: 'error',
			message: validation_result.error.details[0].message
		});
	}else{
		Auth.findOne({user_email:check_email}).then(function(login_res){
			if (login_res != null) {
				bcrypt.compare(check_password, login_res.user_password).then(function(isMatch){
				    if (isMatch == true) {
				    	var token = jwt.sign(
				    		{
				    			user_id: login_res._id,
				    			name: login_res.user_name,
				    			email: login_res.user_email
				    		},
				    		process.env.JWT_SECRET_KEY,	
				    		{
				    			expiresIn: "10m"
				    		}
				    	);
				    	res.status(200).json({
							result: 'success',
							data: token,
							massage: 'Account LoggedIn!'
						});
				    }else{
				    	res.status(200).json({
							result: 'error',
							data: req.body,
							massage: 'Password is incorrect, check password!'
						});
				    }
				});	
			}else{
				res.status(200).json({
					result: 'error',
					data: req.body,
					massage: 'There is no account for this email!'
				});
			}
		});
	}	
});

// Register
router.post('/register', function(req, res, next){
	var validation_result = authRegValidation(req.body);
	if(validation_result.error){
		res.status(200).json({
			result: 'error',
			message: validation_result.error.details[0].message
		});
	}else{
		Auth.findOne({user_email:req.body.user_email}).then(function(reg_result){
			if (reg_result == null) {
				bcrypt.hash(req.body.user_password, 10, function(hashedPassword){
					var auth_data = new Auth({
						user_name: req.body.user_name,
						user_email: req.body.user_email,
						user_password: hashedPassword,
					});
					auth_data.save()
					.then(function(saved_result){
						res.status(200).json({
							result: 'success',
							data: saved_result,
							message: 'Auth registered!'	
						});	
					})
					.catch(next);
				});	
			}else{
				res.status(200).json({
					result: 'error',
					data: req.body,
					message: 'Email already exists!'		
				});
			}
		});
	}		
});

module.exports = router;