const express = require('express');
const router = express.Router();

// GET Method
router.get('/', function(req, res, next){
	res.status(201).json({
		result: 'success',
		message: 'Welcome to API User GET Method!'
	});
});

// POST Method
router.post('/', function(req, res, next){
	res.status(201).json({
		result: 'success',
		message: 'Welcome to API User POST Method!'
	});
});


module.exports = router;