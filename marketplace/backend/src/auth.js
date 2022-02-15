const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./db');
const secret = `magicsecret`;

exports.authenticate = async (req, res) => {
  const {email, password} = req.body;
  const personList = await db.selectPerson(email);
  if (personList.length>=1) {
    const person = personList[0];
    if (bcrypt.compareSync(password, person.password)) {
      const accessToken = jwt.sign(
        {email: person.email, role: person.role},
        secret, {
          expiresIn: '30m',
          algorithm: 'HS256',
        });
      res.status(200).json({name: person.name, accessToken: accessToken});
      return;
    }
  }
  res.status(401).send('Username or password incorrect');
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

