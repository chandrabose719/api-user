const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
	emp_name: {
		type: String,
		required: true,
	},
	emp_email: {
		type: String,
		required: true,
	},
	emp_password: {
		type: String,
		required: true,
	},
	emp_mobile: {
		type: String,
		required: true,
	},
	status:{
		type:String,
		default: 'active'
	},	
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Employee', employeeSchema);

