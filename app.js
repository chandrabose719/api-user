const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authentication');
const employeeRoutes = require('./routes/employee');

app.use('/authentication', authRoutes);
app.use('/employee', employeeRoutes);

// Error
app.use(function(req, res, next){
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use(function(error, req, res, next){
	res.status(error.status || 500);
	res.json({
		"result":"error", 
		"message": error.message
	});
});

module.exports = app;

