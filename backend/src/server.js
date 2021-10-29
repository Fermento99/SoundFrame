const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./controllers/router'));

app.get('/', (req, res) => {
  res.send('server running');
})

app.listen(3000, () => console.log('listening on 3000...'))
