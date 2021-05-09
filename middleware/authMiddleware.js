const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).send('Unauthorized');
  }
};
