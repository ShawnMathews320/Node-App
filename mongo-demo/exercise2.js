const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1/mongo-exercises')
	.then(() => console.log('MongoDB connected.'))
	.catch((error) => console.log('Could not connect to MongoDB', error));

const courseSchema = new mongoose.Schema({
	tags: [String],
	date: { type: Date, default: Date.now },
	name: String,
	author: String,
	isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
	return await Course.find({
		isPublished: true,
		tags: { $in: ['backend', 'frontend'] },
	})
		.sort({ price: -1 })
		.select({ name: 1, author: 1 });
}

async function run() {
	const courses = await getCourses();
	console.log(courses);
}

run();
