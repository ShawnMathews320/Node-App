const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1/vidly')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((error) => console.log('Could not connect to MongoDB...', error));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
