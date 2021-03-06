const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// get all genres
router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

// create a genre
router.post('/', async (req, res) => {
	const { error } = validate(req);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold,
	});
	customer = await customer.save();

	res.send(customer);
});

// update a genre
router.put('/:id', async (req, res) => {
	const { error } = validate(req);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{
			new: true,
		}
	);

	if (!customer)
		return res
			.status(404)
			.send('The customer with the given ID was not found.');

	res.send(customer);
});

// delete a genre
router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndUpdate(req.params.id);

	if (!customer)
		return res
			.status(404)
			.send('The customer with the given ID was not found.');

	res.send(customer);
});

// check if genre id exists
router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if (!customer)
		res.status(404).send('The customer with the given ID was not found.');
	res.send(customer);
});

module.exports = router;
