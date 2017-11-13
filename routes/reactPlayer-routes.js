const express = require('express');
const reactPlayerRouter = express.Router();

const reactPlayerController = require('../controllers/reactPlayer-controller');
// reactPlayerRouter.get('/', reactPlayerController.index);
// reactPlayerRouter.get('/songs',reactPlayerController.songs);
// reactPlayerRouter.get('/test',reactPlayerController.test);

reactPlayerRouter.post('/song',reactPlayerController.song);
reactPlayerRouter.post('/search',reactPlayerController.search);


module.exports = reactPlayerRouter;

