const express = require('express');
const { model } = require('mongoose');
const router = express.Router()

// @route   Get api/profile
// @desc    Test/Route
// access   Public

router.get('/', (req, res) => res.send('profile Route'));

module.exports = router;
