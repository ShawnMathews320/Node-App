const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
	'Customer',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 100,
		},
		isGold: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 100,
		},
	})
);

// validation requirements
function validateCustomer(req) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(50).required(),
		phone: Joi.string().min(1).max(50).required(),
		isGold: Joi.boolean(),
	});

	return schema.validate({ name: req.body.name });
}

exports.Customer = Customer;
exports.validate = validateCustomer;
