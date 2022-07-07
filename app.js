const express = require('express');
const rateLimit = require('express-rate-limit');

// Router
const { userRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.routes');
const { consoleRouter } = require('./routes/console.routes');

// Global err controller
const { globalErrorHandler } = require('./controllers/error.contoller');

// Utils
const { AppError } = require('./utils/appError.util');

// Init an express app
const app = express();

// Enable incoming JSON
app.use(express.json());

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
	max: 10000,
	windowMs: 60 * 60 * 1000, // 1 hr
	message: 'Number of requests have been exceeded',
});

app.use(limiter);

// Define endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/consoles', consoleRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports = { app };
