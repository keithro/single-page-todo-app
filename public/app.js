$(document).ready(() => {
  $.getJSON('/api/todos')
    .then(addTodos);

  $('#todoInput').keypress((event) => {
    if (event.which == 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
  })

  // listening on parent (list) because of event delegation but listening for clicks on the span
  $('.list').on('click', 'span', function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

function addTodo(todo) {
  const newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

function addTodos(todos) {
  // add todos to page
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function createTodo() {
  // send request to create new todo
  const usrInput = $('#todoInput').val();
  $.post('/api/todos', { name: usrInput }) // able to pass in object with .post()
    .then((newTodo) => {
      $('#todoInput').val('');
      addTodo(newTodo);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeTodo(todo) {
  const clickedId = todo.data('id');
  const deleteUrl = `/api/todos/${clickedId}`;

  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
    .then((data) => {
      todo.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateTodo(todo) {
  const updateUrl = `/api/todos/${todo.data('id')}`;
  const isDone = !todo.data('completed'); // reverse current state of data attribute we created on add
  const updateData = { completed: isDone };

  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData // will only take string. so create var above
  })
    .then((updatedTodo) => {
      todo.toggleClass('done'); // update view
      todo.data('completed', isDone); // update data method
    });
}
