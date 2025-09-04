const express = require('express');
const { model } = require('mongoose');
const router = express.Router()
const auth = require("../../middleware/auth")
const User = require("../../modules/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");


// @route   Get api/auth
// @desc    Test/Route
// access   Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }   
    catch (err) {
        console.error(err.msg)
        res.status(500).json({msg : err})
    }
    
});



// @route   Post api/auth
// @desc   Test/Route
// access   Public

router.post(
  "/",
  [
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "Please enter a password with more than 6 chars"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password } = req.body;
    try {
      // See if the user exist

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(200)
          .json({ errors: [{ message: "email or password is incorrect" }] });
        }
    
        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
          .status(200)
          .json({ errors: [{ message: "email or password is incorrect" }] });
        }

        

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
