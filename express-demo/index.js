const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticate = require('./authentication');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
//console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to the database...');

app.use(logger);

app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
