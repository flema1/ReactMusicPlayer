const express = require('express');
const reactPlayerRouter = express.Router();

const reactPlayerController = require('../controllers/reactPlayer-controller');
// reactPlayerRouter.get('/', reactPlayerController.index);
// reactPlayerRouter.get('/songs',reactPlayerController.songs);
// reactPlayerRouter.get('/test',reactPlayerController.test);

reactPlayerRouter.post('/song',reactPlayerController.song);
reactPlayerRouter.post('/search',reactPlayerController.search);
reactPlayerRouter.get('/playlists',reactPlayerController.getPlayLists);
reactPlayerRouter.post('/loadPlaylist',reactPlayerController.loadPlaylist);
reactPlayerRouter.post('/addToPlaylist',reactPlayerController.addToPlaylist);
reactPlayerRouter.get('/favorites',reactPlayerController.getFavorites);
reactPlayerRouter.get('/allArtists',reactPlayerController.getAllartists);
reactPlayerRouter.get ('/getAllTracks',reactPlayerController.getAllTracks);
reactPlayerRouter.post('/getArtist',reactPlayerController.getArtist);
module.exports = reactPlayerRouter;

