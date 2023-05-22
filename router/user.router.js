const express = require('express');
const router = express.Router();
const User = require('../db/conn').User;

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    res.json({ username: user.username, count: user.count, id: user._id });
  } catch (err) {
    res.json(err.message).status(400);
  }
});

module.exports = router;
