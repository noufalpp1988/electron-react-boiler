/* eslint import/prefer-default-export: off */
import cors from 'cors';
import connectDB from './db';

const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:1212'],
    method: ['GET","POST","DELETE","PUT","PATCH'],
    credentials: true,
  }),
);

const router = require('./routes/routes');
const AuthRoutes = require('./routes/AuthRoutes');

app.use(cookieParser());
app.use(express.json());

app.use('/', AuthRoutes);
app.use('/tasks', router);

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

connectDB();

const serverStart = () => {
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
        // setTimeout(() => {
        //   server.listen(port);
        // }, 1000);
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
