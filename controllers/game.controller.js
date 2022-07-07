const dotenv = require('dotenv');


// Models
const { Game } = require('../models/game.model')
const { Console } = require('../models/console.model');
const { Review } = require('../models/review.model');

dotenv.config({ path: './config.env' });

const { catchAsync } = require('../utils/catchAsync.util');

const getAllRegistersGames = catchAsync(async (req, res, next) => {
    const games = Game.findAll({
        include: [
            { model: Console }, { model: Review }
        ]
    });

    res.status(200).json({
        status: 'success',
        games
    });
}); 

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre } = req.doby;

    const newGame = await Game.create({
        title,
        genre
    });

    res.status(201).json({
        status: 'success',
        newGame
    })
});

const updateGame = catchAsync(async (req, res, next) => {
    const { game } = req;
    const { title } = req.doby;

    await game.update({ title });

    res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
    const { game } = req;

    await game.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { comment } = req.body;
    const { sessionUser, game } = req;

    const newReview = await Review.create({
        comment,
        gameId: game.id,
        userId: sessionUser.id
    });

    res.status(201).json({ 
        status: 'success',
        newReview
    });

});

module.exports = {
    getAllRegistersGames,
    createGame,
    updateGame,
    deleteGame,
    createReview
};