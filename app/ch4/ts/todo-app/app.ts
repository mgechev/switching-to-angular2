import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'app',
  templateUrl: '<%= currentPath %>app.html',
  styles: [
    `ul li {
      list-style: none;
    }
    .completed {
      text-decoration: line-through;
    }`
  ]
})
class TodoCtrl {
  todos: Todo[];
  name: string;
  private temp: string;
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
  addTodo(label) {
    this.todos.push({
      label,
      completed: false
    })
  }
  removeTodo(idx) {
    this.todos.splice(idx, 1);
  }
  toggleCompletion(idx) {
    let todo = this.todos[idx];
    todo.completed = !todo.completed;
  }
}

bootstrap(TodoCtrl);
