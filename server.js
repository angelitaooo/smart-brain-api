const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [{
      id: '123',
      name: 'felix',
      email: 'felix@gmail.com',
      password: 'rati',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Paquita',
      email: 'paquita@gmail.com',
      password: 'alejo',
      entries: 0,
      joined: new Date()
    },
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req, res) => {
  const {
    email,
    password,
    name
  } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]); // to grab the last item in the array
})

app.get('/profile/:id', (req, res) => {
  const {
    id
  } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
    if (!found) {
      res.status(400).json('not found');
    }
  })
})

app.put('/image', (req, res) => {
  const {
    id
  } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
    if (!found) {
      res.status(400).json('not found');
    }
  })
})

app.listen(3001, () => {
  console.log('app is runnig in port 3001');
})
