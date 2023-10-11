const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//main routing
app.use('/api', routes);

// handle 404
app.use((req, res, next) => {
  res.status(404).json({
      message: "Not found",
  });
});

// handle error
app.use((err, req, res, next) => {
  res.status(500).json({
      message: "Internal Server Error",
  });
});

const host = 'localhost';
const port = 3000;
app.listen(port);
console.log(`Running on ${host}:${port}`);