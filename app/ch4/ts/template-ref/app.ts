import {Component, ContentChild, TemplateRef} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'todo-app',
  template: `
  <h1>Hello {{name}}!</h1>

  <p>
    Add a new todo:
    <input #newtodo type="text">
    <button (click)="addTodo(newtodo)">Add</button>
  </p>

  <p>Here's the list of pending todo items:</p>

  <template ngFor [ngForOf]="todos" [ngForTemplate]="itemsTemplate"/>
  `
})
class TodoCtrl {
  todos: Todo[];
  name: string;
  @ContentChild(TemplateRef)
  itemsTemplate: TemplateRef;

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
}

@Component({
  selector: 'app',
  directives: [TodoCtrl],
  template: `
    <todo-app>
      <template var-todo var-index>
        <input type="checkbox" [checked]="todo.completed"
          (change)="todo.completed = !todo.completed">
        {{todo.label}}<br>
      </template>
    </todo-app>
  `
})
class App {}

bootstrap(App);
