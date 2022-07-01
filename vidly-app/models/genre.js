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

// validation requirements
function validateGenre(req) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate({ name: req.body.name });
}

exports.Genre = Genre;
exports.validate = validateGenre;
