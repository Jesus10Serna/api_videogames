const dotenv = require('dotenv');

// Models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util')

dotenv.config({ path: './config.env'});

const getAllRegistersConsoles = catchAsync(async (req, res, next) => {
    const consoles = Console.findAll({
        include: Game
    });

    res.status(200).json({
        status: 'success',
        consoles
    })
});

const createNewGame = catchAsync(async (req, res, next) => {
    const { name, company } = req.body;

    const newGame = await Game.create({
        name,
        company
    });

    res.status(200).json({
        status: 'success',
        newGame
    })
});

const updateTitleConsole = catchAsync(async (req, res, next) => {
    const { console } = req;
    const { name } = req.body;

    await console.update({ name: name });

    res.status(204).json({ status: 'success' });

});

const deleteConsole = catchAsync(async (req, res, next) => {
    const { console } = req;

    await console.update({ status: 'deleted' });

    res.status(204).json({ status: 'succes' })
})

module.exports = {
    getAllRegistersConsoles,
    createNewGame,
    updateTitleConsole,
    deleteConsole
};
