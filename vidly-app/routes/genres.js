const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model(
	'Genre',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
		},
	})
);

// get all genres
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

// create a genre
router.post('/', async (req, res) => {
	const { error } = validateGenre(req);
	if (error) return res.status(400).send(error.details[0].message);

	let genre = new Genre({ name: req.body.name });
	genre = await genre.save();

	res.send(genre);
});

// update a genre
router.put('/:id', async (req, res) => {
	const { error } = validateGenre(req);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{
			new: true,
		}
	);

	if (!genre)
		return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

// delete a genre
router.delete('/:id', async (req, res) => {
	const genre = await Genre.findByIdAndUpdate(req.params.id);

	if (!genre)
		return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});

// check if genre id exists
router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	if (!genre)
		res.status(404).send('The genre with the given ID was not found.');
	res.send(genre);
});

// validation requirements
function validateGenre(req) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate({ name: req.body.name });
}

module.exports = router;
