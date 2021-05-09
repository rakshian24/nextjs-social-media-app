const express = require('express');
const app = express();
const server = require('http').Server(app);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require('dotenv').config({ path: './config.env' });
const connectDB = require('./utilsServer/connectDb');
const PORT = process.env.PORT || 3000;
connectDB();

nextApp.prepare().then(() => {
  app.use(express.json());
  app.use('/api/signup', require('./api/signup'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/search', require('./api/search'));

  app.all('*', (req, res) => handle(req, res));
  server.listen(PORT, err => {
    if (err) {
      throw err;
    } else {
      console.log(`Server running on port : ${PORT}`);
    }
  });
});
