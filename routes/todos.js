const express = require('express');
const db = require('../models'); // delete? not using
const helpers = require('../helpers/todos');

const router = express.Router(); // allows us to break out routes into modular chunks

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo);

router.route('/:todoId')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
