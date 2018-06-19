const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get("/:userid/search", searchController.getUserByEmail);


module.exports = router;
