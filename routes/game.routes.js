const express = require('express');

// Controller
const {
    getAllRegistersGames,
    createGame,
    updateGame,
    deleteGame,
    createReview
} = require('../controllers/game.controller');

// Middleware
const { gameExist } = require('../middlewares/game.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const gameRouter = express.Router();

gameRouter.get('/', getAllRegistersGames);

gameRouter.use(protectSession);

gameRouter.post('/', createGame);

gameRouter
    .use('/reviews/:id', gameExist, createReview)
    .route('/:id')
    .patch(updateGame)
    .delete(deleteGame)

module.exports = { gameRouter };