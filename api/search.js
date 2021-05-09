const express = require('express');
const UserModel = require('../models/UserModel');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:searchText', authMiddleware, async (req, res) => {
  const { searchText } = req.params;
  const processedSearchTxt = searchText.trim();

  if (searchText.length === 0) return;
  try {
    const results = await UserModel.find({
      name: { $regex: processedSearchTxt, $options: 'i' },
    });
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
