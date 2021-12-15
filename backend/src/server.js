const express = require('express');
const app = express();
require('./dbmanager/connection');
require('dotenv').config();


app.use(express.json());
app.use(express.static('./src/build'))
app.use('/api', require('./controllers/router'));

app.get(/\/(api){0}/, (req, res) => {
  res.sendFile(__dirname+'/build/index.html');
})

app.listen(3001, '0.0.0.0', () => console.log('listening on 3001...'))
