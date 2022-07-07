const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations

// 1 User <----> M reviews
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

// 1 Game <----> M reviews
Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

// M games <----> M consoles
Game.belongsToMany(Console, { foreignKey: 'consoleId', through: 'gameInConsole' });
Console.belongsToMany(Game, { foreignKey: 'gameId', through: 'gameInConsole'});

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('Express app running!!');
});