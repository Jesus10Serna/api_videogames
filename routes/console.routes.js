const express = require('express');

// Controller
const {
    getAllRegistersConsoles,
    createNewGame,
    updateTitleConsole,
    deleteConsole
} = require('../controllers/console.controller');

// Middlewares
const { consoleExist } = require('../middlewares/console.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const consoleRouter = express.Router();

consoleRouter.get('/', getAllRegistersConsoles);

consoleRouter.use(protectSession);

consoleRouter.post('/', createNewGame);

consoleRouter
    .use('/:id', consoleExist)
    .route('/:id')
    .patch(updateTitleConsole)
    .delete(deleteConsole);

module.exports = { consoleRouter };