const express = require('express');
const reactPlayerRouter = express.Router();

const reactPlayerController = require('../controllers/reactPlayer-controller');

reactPlayerRouter.get('/', reactPlayerController.index);
reactPlayerRouter.post('/', reactPlayerController.create);

reactPlayerRouter.get('/:id', reactPlayerController.show);
reactPlayerRouter.put('/:id', reactPlayerController.update);
reactPlayerRouter.delete('/:id', reactPlayerController.destroy);

module.exports = reactPlayerRouter;

