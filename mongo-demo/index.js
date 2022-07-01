const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1/playground')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((error) => console.log('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 255,
		//match:
	},
	category: {
		type: String,
		required: true,
		enum: ['web', 'mobile', 'network'],
		lowercase: true,
		trim: true,
	},
	author: String,
	tags: {
		type: Array,
		validate: {
			isAsync: true,
			validator: function (v, callback) {
				return new Promise((callback) => {
					setTimeout(() => {
						const result = v && v.length > 0;
						callback(result);
					}, 1000);
				});
			},
			message: 'A course should have at least one tag',
		},
	},
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: function () {
			return this.isPublished;
		},
		min: 10,
		max: 200,
		get: (v) => Math.round(v),
		set: (v) => Math.round(v),
	},
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
	const course = new Course({
		name: 'Angular Course',
		category: 'Web',
		author: 'Mosh',
		tags: ['frontend'],
		isPublished: true,
		price: 15.8,
	});

	try {
		const result = await course.save();
		console.log(result);
	} catch (err) {
		for (let field in err.errors) {
			console.log(err.errors[field].message);
		}
	}
}

async function getCourses() {
	// eq
	// ne
	// gt
	// gte
	// lt
	// lte
	// in
	// nin
	const pageNumber = 2;
	const pageSize = 10;

	const courses = await Course
		// .find({ author: 'Mosh', isPublished: true })
		// .find({ price: { $gte: 10, $lte: 20 } })
		// .find({ price: { $in: [10, 15, 20] } })
		// .find()
		// .or([{ author: 'Mosh' }, { isPublished: true }])
		// .find({ author: /^Mosh/})
		// .find({ author: /Hamedani$/i })
		.find({ _id: '62bf10b67638e74e7a6b45a2' })
		// .skip((pageNumber - 1) * pageSize)
		// .limit(pageSize)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1, price: 1 });
	// .count();
	console.log(courses[0].price);
}

async function updateCourse(id) {
	const result = await Course.updateOne(
		{ name: 'ASP.NET MVC Course' },
		{
			$set: {
				author: 'Shawn',
				isPublished: false,
			},
		}
	);

	console.log(result);
}

getCourses();
