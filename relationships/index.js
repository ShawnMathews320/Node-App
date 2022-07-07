// trade off between query performance vs cnosistency

// using references (Normalization) => consistency
let author = {
	name: 'Shawn Mathews',
};

let course = {
	author: 'id',
};

// using embedded documents (Denormalization) => performance
let course1 = {
	author: {
		name: 'Shawn Mathews',
	},
};

// hybrid
let author2 = {
	name: 'Shawn Mathews',
	// 50 other properties
};

let course3 = {
	author: {
		id: 'ref',
		name: 'Shawn Mathews',
	},
};
