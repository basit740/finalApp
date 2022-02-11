const express = require('express');
const colors = require('colors');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db.js');

const morgan = require('morgan');
app.use(cors());
app.use(morgan('tiny'));
//const socketio = require('socket.io');

//const server = http.createServer(app);

// var server = http.createServer(app).listen(5000, function () {
// 	console.log('Express server listening on port 5000');
// });

// const io = socketio(server, {
// 	cors: {
// 		origin: 'http://localhost:3000',
// 	},
// });

var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(5000, function () {
	var host = http.address().address;
	var port = http.address().port;
	console.log('server listening at port 5000');
});

///

//////////////// send data to client ////////////////

const SEND_INTERVAL = 1000;

let seconds = 60;
let timerStarted = false;

const startTimer = () => {
	timerStarted = true;

	setTimeout(function () {
		const myInterval = setInterval(() => {
			if (seconds < 0) {
				clearInterval(myInterval);
			}
			seconds--;
		}, SEND_INTERVAL);
	}, 6000);
};

app.get('/api/countdown', (req, res) => {
	res.status(200).json({
		seconds: seconds,
	});
});

///

const Passwords = require('./models/Passwords');

const Flag = require('./models/Flag');

connectDB();

// app.listen(5000, () => {
// 	console.log('server is running at port 5000');
// });

app.get('/api/home/', (req, res) => {
	res.send('this is api home');
});

app.get('/', (req, res) => {
	res.send('this is actual home');
});

app.get('/api/v1/gotoFinal', async (req, res) => {
	const updatedFlags = await Flag.findOneAndUpdate({
		flag: true,
		countDown: true,
	});
	res.status(200).json({
		success: true,
		data: updatedFlags,
	});
});

app.post('/api/v1/firstPassword', async (req, res) => {
	let password = req.query.password;
	console.log(password);
	const passwords = await Passwords.find();

	console.log(passwords);
	let updatedFlags = null;
	if (passwords[0].firstPassword === password) {
		console.log('changed');
		updatedFlags = await Flag.findOneAndUpdate({
			flag: true,
			firstPassword: true,
		});
	}

	if (updatedFlags != null) {
		res.status(200).json({
			success: true,
		});
	} else {
		res.status(400).json({
			success: false,
			error: 'wrong password',
		});
	}
});

// passwordTwo Route
app.post('/api/v1/passwordTwo', async (req, res) => {
	let password = req.query.password;
	let passwords = await Passwords.find();
	let updatedFlags = null;
	let passwordsDone = 0; // to check if all the four passwords are done

	if (passwords[0].passwordTwo === password) {
		updatedFlags = await Flag.findOneAndUpdate({
			flag: true,
			passwordTwo: true,
		});
		passwordsDone++;
		if (updatedFlags.passwordThree === true) {
			passwordsDone++;
		}
		if (updatedFlags.passwordFour === true) {
			passwordsDone++;
		}
		if (updatedFlags.passwordFive === true) {
			passwordsDone++;
		}

		if (passwordsDone === 4) {
			updatedFlags = await Flag.findOneAndUpdate({
				flag: true,
				passwords: true,
			});
			if (timerStarted === false) {
				startTimer();
			}
		}
	}
	if (updatedFlags === null) {
		res.status(400).json({
			success: false,
			error: 'wrong password',
		});
	} else {
		res.status(200).json({
			success: true,
			flags: updatedFlags,
		});
	}
});
/// End passwordTwo Route
// passwordThree Route

app.post('/api/v1/passwordThree', async (req, res) => {
	let password = req.query.password;
	let passwords = await Passwords.find();
	let updatedFlags = null;
	let passwordsDone = 0; // to check if all the four passwords are done

	if (passwords[0].passwordThree === password) {
		updatedFlags = await Flag.findOneAndUpdate({
			flag: true,
			passwordThree: true,
		});
		passwordsDone++;

		if (updatedFlags.passwordTwo === true) {
			passwordsDone++;
		}

		if (updatedFlags.passwordFour) {
			passwordsDone++;
		}

		if (updatedFlags.passwordFive === true) {
			passwordsDone++;
		}
		if (passwordsDone === 4) {
			updatedFlags = await Flag.findOneAndUpdate({
				flag: true,
				passwords: true,
			});

			if (timerStarted === false) {
				startTimer();
			}
		}
	}
	if (updatedFlags === null) {
		res.status(400).json({
			success: false,
			error: 'wrong password',
		});
	} else {
		res.status(200).json({
			success: true,
			flags: updatedFlags,
		});
	}
});

/// End passwordThree Route

// passwordFour Route

app.post('/api/v1/passwordFour', async (req, res) => {
	let password = req.query.password;
	let passwords = await Passwords.find();
	let updatedFlags = null;
	let passwordsDone = 0; // to check if all the four passwords are done

	if (passwords[0].passwordFour === password) {
		updatedFlags = await Flag.findOneAndUpdate({
			flag: true,
			passwordFour: true,
		});
		passwordsDone++;

		if (updatedFlags.passwordTwo === true) {
			passwordsDone++;
		}

		if (updatedFlags.passwordThree === true) {
			passwordsDone++;
		}

		if (updatedFlags.passwordFive === true) {
			passwordsDone++;
		}

		if (passwordsDone === 4) {
			updatedFlags = await Flag.findOneAndUpdate({
				flag: true,
				passwords: true,
			});

			if (timerStarted === false) {
				startTimer();
			}
		}
	}
	if (updatedFlags === null) {
		res.status(400).json({
			success: false,
			error: 'wrong password',
		});
	} else {
		res.status(200).json({
			success: true,
			flags: updatedFlags,
		});
	}
});

/// End passwordFour Route

// passwordFive Route

app.post('/api/v1/passwordFive', async (req, res) => {
	let password = req.query.password;
	let passwords = await Passwords.find();
	let updatedFlags = null;
	let passwordsDone = 0; // to check if all the four passwords are done

	if (passwords[0].passwordFive === password) {
		updatedFlags = await Flag.findOneAndUpdate({
			flag: true,
			passwordFive: true,
		});
		//change this logic,,
		passwordsDone++;

		if (updatedFlags.passwordTwo === true) {
			passwordsDone++;
		}

		if (updatedFlags.passwordThree === true) {
			passwordsDone++;
		}

		if (updatedFlags.passwordFour === true) {
			passwordsDone++;
		}
		if (passwordsDone === 4) {
			updatedFlags = await Flag.findOneAndUpdate({
				flag: true,
				passwords: true,
			});

			if (timerStarted === false) {
				startTimer();
			}
		}
	}
	if (updatedFlags === null) {
		res.status(400).json({
			success: false,
			error: 'wrong password',
		});
	} else {
		//sending data

		io.on('connection', function (socket) {
			console.log('Client connected to the WebSocket');

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});

			// socket.on('chat message', function(msg) {
			//   console.log("Received a chat message");
			//   io.emit('chat message', msg);
			// });

			socket.on('counter', (msg) => {
				console.log(msg);
				io.emit('counter', mg);
			});
		});

		res.status(200).json({
			success: true,
			flags: updatedFlags,
		});
	}
});

/// End passwordFive Route

// app.post('/api/v1/passwords', async (req, res) => {
// 	console.log('working');
// 	let currentPassword = null;
// 	if (req.query.passwordTwo) {
// 		currentPassword = req.query.passwordTwo;
// 	} else if (req.query.passwordThree) {
// 		currentPassword = req.query.passwordThree;
// 	} else if (req.query.passwordFour) {
// 		currentPassword = req.query.passwordFour;
// 	} else if (req.query.passwordFive) {
// 		currentPassword = req.query.passwordFive;
// 	}

// 	console.log(currentPassword);
// 	const passwords = await Passwords.find();

// 	let updatedFlags = null;

// 	if (passwords[0].passwordTwo === currentPassword) {
// 		updatedFlags = await Flag.findOneAndUpdate({
// 			flag: true,
// 			passwordTwo: true,
// 		});
// 	} else if (passwords[0].passwordThree === currentPassword) {
// 		updatedFlags = await Flag.findOneAndUpdate({
// 			flag: true,
// 			passwordThree: true,
// 		});
// 	} else if (passwords[0].passwordFour === currentPassword) {
// 		updatedFlags = await Flag.findOneAndUpdate({
// 			flag: true,
// 			passwordFour: true,
// 		});
// 	} else if (passwords[0].passwordFive === currentPassword) {
// 		updatedFlags = await Flag.findOneAndUpdate({
// 			flag: true,
// 			passwordFive: true,
// 		});
// 	}

// 	if (updatedFlags == null) {
// 		res.status(400).json({
// 			success: false,
// 			error: 'wrong password',
// 		});
// 	} else {
// 		if (updatedFlags.passwordTwo === true) {
// 			res.status(200).json({
// 				passwordTwo: true,
// 			});
// 		} else if (updatedFlags.passwordThree === true) {
// 			res.status(200).json({
// 				passwordThree: true,
// 			});
// 		} else if (updatedFlags.passwordFour === true) {
// 			res.status(200).json({
// 				passwordFour: true,
// 			});
// 		} else if (updatedFlags.passwordFive === true) {
// 			res.status(200).json({
// 				passwordFive: true,
// 			});
// 		} else {
// 			res.status(400).json({
// 				success: false,
// 				error: 'wrong password',
// 			});
// 		}
// 	}
// });

app.get('/api/v1/flags', async (req, res) => {
	const flags = await Flag.findOne();
	console.log(flags);
	res.status(200).json({
		success: true,
		flags: flags,
	});
});
