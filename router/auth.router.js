const express = require('express');
const router = express.Router();
const User = require('../db/conn').User;
const bcrypt = require('bcrypt');

router.post('/signUp', async (req, res) => {
  const { email, password, username } = req.body;

  const user = await User.findOne({ email }).exec();
  try {
    if (user != null) {
      throw new Error('User registered');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    console.log(hashPassword);
    const newUser = new User({
      email,
      password: hashPassword,
      username,
      count: 0,
    });

    newUser
      .save()
      .then(() => {
        res.json({
          username: newUser.username,
          count: newUser.count,
          id: newUser._id,
        });
      })
      .catch(error => {
        console.log(error);
        throw new Error('Error saving user', error);
      });
  } catch (err) {
    res.json(err.message).status(400);
  }
});

router.post('/signIn', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error('Wrong credentials.');
    }

    res.json({ username: user.username, count: user.count, id: user._id });
  } catch (err) {
    res.json(err.message).status(400);
  }
});

module.exports = router;
