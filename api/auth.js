const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

router.post('/', async (req, res) => {
  const { email, password } = req.body.user;

  try {
    if (!isEmail) {
      return res.status(400).send('Invalid Email');
    }
    if (password.length < 6) {
      return res.status(400).send('Password must be alteast 6 characters');
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      '+password',
    );
    if (!user) {
      return res.status(401).send('Invalid Credentials');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send('Invalid Credentials');
    }

    //Token
    const payload = {
      userId: user._id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).send(token);
      },
    );
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
