const TodoClient = {
  on: function (event, handler) {
    this.todo_app.addEventListener(event, (evt) => {
      handler(evt.detail);
    });
  },
  trigger: function (event, details) {
    const customEvent = new CustomEvent(event, { detail: details });
    this.todo_app.dispatchEvent(customEvent);
  },
  registerDomElements: function() {
    this.todo_app = document.getElementById('js-todo-app');
    this.new_todo_task = document.getElementById('js-new-todo-task');
    this.todo_list = document.getElementById('js-todo-list');
    this.add_todo_button = document.getElementById('js-add-todo-button');
  },
  registerBaseEventListeners: function() {
   
    this.new_todo_task.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        console.log('Detected keydown event with key enter');
        this.trigger('add_todo');
      }
    });

    this.add_todo_button.addEventListener('click', () => {
      this.trigger('add_todo');
    });
  },
  registerCustomEventListeners: function () {
    this.on('add_todo', () => {
      console.log('Received add_todo event');

      if (!this.new_todo_task.value) {
        console.log('Cannot add empty task to task list!');
        this.trigger('add_empty_task');
        return;
      }

      console.log('Add new task to todo-list: ' + this.new_todo_task.value);
      const task = document.createElement('div');
      task.addEventListener('click', (event) => {
        this.trigger('finish_task', event.target);
      });
      task.classList.add('c-todo__task');
      task.innerText = this.new_todo_task.value;

      this.todo_list.appendChild(task);

      this.trigger('clear_task-input');
    });

    this.on('finish_task', (element) => {
      console.log('Received finish_task event');

      /* if the element is already marked as finished then remove it finally from the dom  */
      if (element.classList.contains('c-todo__task--finished')) {
        console.log('Delete already finished task');
        element.parentNode.removeChild(element);
      }

      element.classList.add('c-todo__task--finished');
    });

    this.on('clear_task-input', () => {
      console.log('Received clear_task-input event');
      this.new_todo_task.value = '';
    });

    this.on('add_empty_task', () => {
      alert('You have to add some text first!');
    });
  },
  start: function () {
    console.log('Starting TodoClient.js');

    var that = this;

    that.registerDomElements();
    that.registerBaseEventListeners();
    that.registerCustomEventListeners();
    

    return that;
  },
};

/* This function get's automatically executed when the dom becomes ready */
(function () {
  TodoClient.start();
})();
