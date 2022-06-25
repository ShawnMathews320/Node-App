const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
	{ id: 1, genre: 'horror' },
	{ id: 2, genre: 'action' },
	{ id: 3, genre: 'comedy' },
];

// get all genres
app.get('/api/genres/', (req, res) => {
	res.send(genres);
});

// create a genre
app.post('/api/genres', (req, res) => {
	const { error } = validateGenre(req);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};
	genres.push(genre);
	res.send(genre);
});

// update a genre
app.put('/api/genres/:id', (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send('The course with the given ID was not found.');

	const { error } = validateGenre(req);
	if (error) return res.status(400).send(error.details[0].message);

	genre.name = req.body.name;
	res.send(genre);
});

// delete a genre
app.delete('/api/genres/:id', (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send('The course with the given ID was not found.');
	res.send(genre);

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genre);
});

// check if genre id exists
app.get('/api/genres/:id', (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre)
		res.status(404).send('The course with the given ID was not found.');
	res.send(genre);
});

// validation requirements
function validateGenre(req) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate({ name: req.body.name });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
