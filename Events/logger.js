const EventEmitter = require('events');

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
	log(message) {
		// send an HTTP request
		console.log(message);

		this.emit('messageLogged', { id: 1, url: 'http://' });
	}
}

module.exports = Logger;
