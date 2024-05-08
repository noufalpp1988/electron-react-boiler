/* eslint import/prefer-default-export: off */
const http = require('http');
const express = require('express');

const app = express();

const serverStart = () => {
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

  const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3001');
  app.set('port', port);

  const server = http.createServer(app);

  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind =
      typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges.`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use. Retrying ...`);
        server.close();
        setTimeout(() => {
          server.listen(port);
        }, 1000);
        break;
      default:
        throw error;
    }
  });

  app.get('/api', (req, res) => {
    res.json({ message: 'This is response from server!' });
  });

  server.on('listening', () => {
    const address = server.address();
    const bind =
      typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
  });

  server.listen(port);
};

export default serverStart;
