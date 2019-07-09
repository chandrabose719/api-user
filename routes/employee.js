const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Models
const Employee = require('../models/employee');

// Validation
const { empRegValidation } = require('../validation/user');

// Get Method
router.get('/', function(req, res, next){
	Employee.find({}).then(function(emp_result){
		if(emp_result != null && emp_result != ''){
			res.status(201).json({
				result: 'success',
				message: 'All employee details!',
				data: emp_result
			});
		}else{
			res.status(422).json({
				result: 'error',
				message: 'There is no employee details!',
				data: emp_result
			});
		}
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	var emp_id = {
		'_id': req.params.id
	}
	Employee.findOne(emp_id).then(function(reg_result){
		if(reg_result != null){
			res.status(201).json({
				result: 'success',
				message: 'Employee detail!',
				data: reg_result,
			});
		}else{
			res.status(422).json({
				result: 'error',
				message: 'There is no employee details!'
			});
		}
	})
	.catch(next);
});

// Post Method
router.post('/', function(req, res, next){
	var validation_result = empRegValidation(req.body);
	if(validation_result.error){
		res.status(422).json({
			result: 'error',
			message: validation_result.error.details[0].message
		});
	}else{
		Employee.findOne({emp_email:req.body.emp_email}).then(function(reg_result){
			if (reg_result == null) {
				bcrypt.hash(req.body.emp_password, 10, function(err, hashedPassword){
					var employee_data = new Employee({
						emp_name: req.body.emp_name,
						emp_email: req.body.emp_email,
						emp_password: hashedPassword,
						emp_mobile: req.body.emp_mobile
					});
		  			employee_data.save()
					.then(function(saved_result){
						res.status(201).json({
							result: 'success',
							data: saved_result,
							message: 'Employee registered!'	
						});
					})
					.catch(next);
				});
			}else{
				res.status(422).json({
					result: 'error',
					data: req.body,
					message: 'Email already exists!'		
				});
			}
		});	
	}	
});

// Edit Method
router.put('/', function(req, res, next){
	var employee_data = req.body;
	var id = {
		emp_no: req.body.emp_no
	};
	Employee.updateOne(id, employee_data).then(function(updated_result){
		if(updated_result.nModified == true){	
			Employee.find(id).then(function(employee_result){
				res.status(201).json({
					result: 'success',
					data: employee_result,
					message: 'Employee detail updated!'	
				});
			});
		}else{
			res.status(422).json({
				result: 'error',
				data: employee_data,
				message: 'Data not updated, try again!'	
			});
		}
	})
	.catch(next);
});

router.put('/:id', function(req, res, next){
	var employee_data = req.body;
	var id = {
		_id: req.params.id
	};
	Employee.updateOne(id, employee_data).then(function(updated_result){
		if(updated_result.nModified == true){	
			Employee.find(id).then(function(employee_result){
				res.status(201).json({
					result: 'success',
					data: employee_result,
					message: 'Employee detail updated!'	
				});
			});
		}else{
			res.status(422).json({
				result: 'error',
				data: employee_data,
				message: 'Data not updated, try again!'	
			});
		}
	})
	.catch(next);
});

// Delete Method
router.delete('/:id', function(req, res, next){
	var employee_id = {
		_id: req.params.id
	};
	Employee.remove(employee_id).then(function(){
		res.status(200).json({
			result: 'success',
			data: employee_id,
			message: 'Employee data deleted!'	
		});	
	});
});

module.exports = router;