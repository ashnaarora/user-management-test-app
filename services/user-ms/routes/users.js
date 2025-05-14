const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      firstName,
      lastName,
      email
    });

    await user.save();
    res.status(201).json(user);

  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => ({ msg: val.message }));
        res.status(400).json({ errors: messages });
    }
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router; 