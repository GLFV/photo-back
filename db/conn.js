const mongoose = require('mongoose');
const mongoString = process.env.DB_CONNECTION;

mongoose.connect(mongoString);
const database = mongoose.connection;

const connection = () => {
  database.on('error', error => {
    console.log(error);
  });

  database.once('connected', () => {
    console.log('Database Connected');
  });
};

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  count: { type: Number, required: true },
});
const User = mongoose.model('User', UserSchema);

User.createCollection().then(function (collection) {
  console.log('Collection is created!');
});

module.exports = { User, connection };
