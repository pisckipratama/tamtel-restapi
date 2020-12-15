const express = require('express');

app = express();

app.get('/', (req, res) => {
  const { name } = req.query;
  res.status(200).json({ success: true, message: `Hello ${name ? name : 'Guest'}!` });
})

app.listen(3000, () => {
  console.log('server running on port 3000');
});

module.exports = app;