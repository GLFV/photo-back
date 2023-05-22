const express = require('express');
const router = express.Router();
const User = require('../db/conn').User;
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '7777c3a4a476451b9b856bdbc903eed7',
});

router.put('/image', (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
});

router.post('/image', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { new: true }
    );
    if (user) {
      res.json({ username: user.username, count: user.count, id: user._id });
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err.message);
    res.json(err.message).status(400);
  }
});

module.exports = router;
