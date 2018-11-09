const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
  users: [
    {
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
  res.send('this is working');
})

app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.json('success');
    } else {
      res.status(400).json('error logging in')
    }
})

app.listen(3000, () => {
  console.log('app is runnig in port 3000');
})
