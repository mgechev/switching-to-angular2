import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'text-input',
  template: `
    <input #todoInput [placeholder]="inputPlaceholder">
    <button (click)="emitTodo(todoInput.value); todoInput.value = '';">
      {{buttonLabel}}
    </button>
  `
})
class InputBox {
  @Input() inputPlaceholder: string;
  @Input() buttonLabel: string;
  @Output() addText = new EventEmitter<string>();
  emitTodo(text: string) {
    this.addText.emit(text);
  }
}

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <li *ngFor="#todo of todos; #index = index" [class.completed]="todo.completed">
        <input type="checkbox" [checked]="todo.completed"
          (change)="toggleCompletion(index)">
        {{todo.label}}
      </li>
    </ul>
  `,
  styles: [
    `ul li {
      list-style: none;
    }
    .completed {
      text-decoration: line-through;
    }`
  ]
})
class TodoList {
  @Input() todos: Todo[];
  @Output() toggle = new EventEmitter<Todo>();
  toggleCompletion(index: number) {
    let todo = this.todos[index];
    this.toggle.emit(todo);
  }
}

@Component({
  selector: 'todo-app',
  directives: [TodoList, InputBox],
  template: `
    <h1>Hello {{name}}!</h1>

    <p>
      Add a new todo:
      <text-input inputPlaceholder="New todo..." buttonLabel="Add" (addText)="addTodo($event)">
      </text-input>
    </p>

    <p>Here's the list of pending todo items:</p>
    <todo-list [todos]="todos" (toggle)="toggleCompletion($event)"></todo-list>
  `
})
class TodoApp {
  todos: Todo[] = [{
    label: 'Buy milk',
    completed: false
  }, {
    label: "Save the world",
    completed: false
  }];
  name: string = 'John';
  addTodo(label: string) {
    this.todos.push({
      label,
      completed: false
    });
  }
  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
  }
}

bootstrap(TodoApp);
