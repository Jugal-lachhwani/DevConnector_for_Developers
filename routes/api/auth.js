const express = require('express');
const { model } = require('mongoose');
const router = express.Router()

// @route   Get api/auth
// @desc    Test/Route
// access   Public

router.get('/', (req, res) => res.send('auth Route'));

module.exports = router;
