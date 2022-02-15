const db = require('./db');

exports.postUser = async (req, res) => {
  const user = req.body;
  const returnUser = await db.insertPerson(user); // with id
  if (!returnUser) {
    res.status(400).send();
  }
  res.status(201).send();
};
