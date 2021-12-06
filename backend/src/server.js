const express = require('express');
const app = express();
require('./dbmanager/connection');
require('dotenv').config();


app.use(express.json());
app.use('/api', require('./controllers/router'));

app.get('/', (req, res) => {
  res.send('server running');
})

app.listen(3001, '0.0.0.0', () => console.log('listening on 3001...'))
