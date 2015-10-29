import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'app'
})
@View({
  templateUrl: '<%= currentPath %>app.html',
  styles: [
    `ul li {
      list-style: none;
    }
    .completed {
      text-decoration: line-through;
    }`
  ],
  directives: [CORE_DIRECTIVES]
})
class TodoApp {
  todos: Todo[];
  name: string;
  temp: string;
  constructor() {
    this.name = "John";
    this.todos = [{
        label: 'Buy milk',
        completed: false
      }, {
        label: "Save the world",
        completed: false
      }];
  }
  addTodo(input:HTMLInputElement) {
    this.todos.push({
      label: input.value,
      completed: false
    })
    input.value = '';
  }
  removeTodo(idx) {
    this.todos.splice(idx, 1);
  }
  toggleCompletion(idx) {
    let todo = this.todos[idx];
    todo.completed = !todo.completed;
  }
}

bootstrap(TodoApp);
