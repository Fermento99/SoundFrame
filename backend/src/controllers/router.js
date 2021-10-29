const express = require('express');
const router = express.Router();
const controllers = require('./controllers.json');

controllers.modules.forEach(mod => router.use(`/${mod}`, require(`./${mod}/${mod}`)))

module.exports = router;