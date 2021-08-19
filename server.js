const express = require('express');
const app = express();
const { PORT, NODE_ENV } = process.env;

const Routes = require('./src/routes/index.route');

app
  .use(express.json())
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))

  //Test server
  .get('/test', (req, res) => {
    res.send('PING!!!');
  })

  //Routes
  .use('/web', Routes)

  .listen(PORT, () => {
    console.log(
      `>>>Server listening on port http://localhost:${PORT} in ${NODE_ENV} mode`
    );
  });
