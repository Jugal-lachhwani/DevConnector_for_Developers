const express = require('express');
const { model } = require('mongoose');
const router = express.Router()

// @route   Get api/user
// @desc    Test/Route
// access   Public

router.get('/', (req, res) => res.send('user Route'));

module.exports = router;
