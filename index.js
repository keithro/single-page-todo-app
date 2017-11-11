const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public')); // Colt's method
// app.use(express.static(__dirname + '/views')); // Colt's method
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));


// ROUTES
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// prefixing '/api/todos' for routes in todos.js file
app.use('/api/todos', todoRoutes);

// Server
app.listen(port, () => {
  console.log(`APP IS RUNNING ON PORT ${port}`);
});
