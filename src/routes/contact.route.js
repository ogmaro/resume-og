const router = require('express').Router();
const db = require('../config/db');
const sendmail = require('@sendgrid/mail');
const { PORT, API_KEY } = process.env;

router.get('/:email', async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const users = await db.query(`
  SELECT name, subject, email, message FROM Users WHERE(email LIKE '${email}')`);

  res.contentType('html');
  res.end(`
  ${users
    .map((user) => {
      return `<p>Your response: <br> Name: ${user.name} <br> Subject: ${user.subject} <br> Email: ${user.email} <br> Message:${user.message} </p>`;
    })
    .join('')}
  `);
});

router.post('/', async (req, res) => {
  const body = req.body;

  const msg = {
    to: ['ogmaro@gmail.com', body.email],
    from: {
      name: 'Njoli Patrick',
      email: 'ogmaro@gmail.com',
    },
    subject: `RE:  ${body.subject}`,
    text: `Hi ${body.name}, you have just contacted Njoli Patrick. Below is the  <a href="http://localhost:${PORT}/web/contact/${body.email}">link</a> to your response`,
    html: `<h3>Hi ${body.name}, you have just contacted Njoli Patrick. Below is the  <a href="http://localhost:${PORT}/web/contact/${body.email}">link</a> to your response</h3>`,
  };
  await db.execute(
    `
    INSERT INTO Users (
      name,
      subject,
      email,
      message
  ) VALUES (
      @name,
      @subject,
      @email,
      @message
  )`,
    {
      name: body.name,
      subject: body.subject,
      email: body.email,
      message: body.message,
    }
  );
  sendmail.setApiKey(API_KEY);
  sendmail
    .send(msg)
    .then((res) => {
      console.log(msg);
    })
    .catch((error) => {
      console.log(error.message);
    });
  console.log('https://' + req.headers.host + req.url);
  res.redirect('httsp://' + req.headers.host + req.url);
});

module.exports = router;
