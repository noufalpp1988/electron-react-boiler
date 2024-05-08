/* eslint import/prefer-default-export: off */

const express = require('express');

const serverStart = () => {
  const app = express();
  const PORT = process.env.PORT || 3001;
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    next();
  });

  app.get('/api', (req, res) => {
    res.json({ message: 'This is response from server!' });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

export default serverStart;
