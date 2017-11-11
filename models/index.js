const mongoose = require('mongoose');

mongoose.set('debug', true); // allows us to see what is failing
mongoose.connect('mongodb://localhost:27017/awdb-todo-api');

mongoose.Promise = Promise; // should this be = 'global.Promise'?

module.exports.Todo = require('./todo');
