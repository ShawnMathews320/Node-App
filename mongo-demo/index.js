const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1/playground')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((error) => console.log('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
	const course = new Course({
		name: 'Angular Course',
		author: 'Mosh',
		tags: ['angular', 'frontend'],
		isPublished: true,
	});

	const result = await course.save();
	console.log(result);
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
		.find({ author: /.*Mosh.*/i })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 })
		// .select({ name: 1, tags: 1 });
		.count();
	console.log(courses);
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

updateCourse('5a68fde3f09ad7646ddec17e');
