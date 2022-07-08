const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1/playground')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
	name: String,
	bio: String,
	website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
	'Course',
	new mongoose.Schema({
		name: String,
		authors: [authorSchema],
	})
);

async function createCourse(name, authors) {
	const course = new Course({
		name,
		authors,
	});

	const result = await course.save();
	console.log(result);
}

async function listCourses() {
	const courses = await Course.find();
	console.log(courses);
}

async function updateAuthor(courseId) {
	const course = await Course.updateOne(
		{ _id: courseId },
		{
			$unset: {
				author: '',
			},
		}
	);
	// course.author.name = 'Shawn Mathews';
	// course.save();
}

async function addAuthor(courseId, author) {
	const course = await Course.findById(courseId);
	course.authors.push(author);
	course.save();
}

async function removeAuthor(courseId, authorId) {
	const course = await Course.findById(courseId);
	const author = course.authors.id(authorId);
	author.remove();
	course.save();
}

//updateAuthor('62c854c3e06e79aa2e2f28f7');
// createCourse('Node Course', [
// 	new Author({ name: 'Shawn' }),
// 	new Author({ name: 'John' }),
// ]);

//addAuthor('62c8586345cf97ebacb35e11', new Author({ name: 'Amy' }));
removeAuthor('62c8586345cf97ebacb35e11', '62c8595dd27ee964bc133867');
