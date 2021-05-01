const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const FollowerModel = require('../models/FollowerModel');
const ProfileModel = require('../models/ProfileModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const userPng =
  'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png';

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get('/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    if (userName.legnth < 3) {
      return res.status(400).send('Bad Request');
    }
    if (!regexUserName.test(userName)) {
      return res.status(400).send('Bad Request');
    }
    const user = await UserModel.findOne({ userName: userName.toLowerCase() });
    if (user) {
      return res.status(400).send('Username already taken!');
    }
    res.status(200).send('Available');
  } catch (e) {
    console.log('Error : ', e);
    return res.status(500).send('Server Error');
  }
});
router.post('/', async (req, res) => {
  const {
    name,
    email,
    userName,
    password,
    bio,
    facebook,
    twitter,
    instagram,
    youtube,
  } = req.body.user;

  try {
    if (!isEmail) {
      return res.status(400).send('Invalid Email');
    }
    if (password.length < 6) {
      return res.status(400).send('Password must be alteast 6 characters');
    }
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).send('User already  registered!');
    }
    user = new UserModel({
      name,
      email: email.toLowerCase(),
      userName: userName.toLowerCase(),
      profilePicUrl: req.body.profilePicUrl || userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileFields = {};
    profileFields.user = user._id;
    profileFields.bio = bio;
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.youtube = youtube;

    await new ProfileModel(profileFields).save();
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();

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
