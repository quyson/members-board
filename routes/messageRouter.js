const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/message', messageController.getMessage);
router.post('/message', messageController.postMessage);

module.exports = router;