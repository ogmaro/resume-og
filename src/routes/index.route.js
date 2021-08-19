const router = require('express').Router();
const contact = require('./contact.route');

router.use('/contact', require('./contact.route'));

module.exports = router;
