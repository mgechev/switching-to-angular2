import {Component, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WorkerAppModule} from '@angular/platform-webworker';
import {FormsModule} from '@angular/forms';
import {platformWorkerAppDynamic} from '@angular/platform-webworker-dynamic';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'input-box',
  template: `
    <input [placeholder]="inputPlaceholder" [(ngModel)]="input">
    <button (click)="emitText()">
      {{buttonLabel}}
    </button>
  `
})
class InputBox {
  @Input() inputPlaceholder: string;
  @Input() buttonLabel: string;
  @Output() inputText = new EventEmitter<string>();
  input: string;

  emitText() {
    this.inputText.emit(this.input);
    this.input = '';
  }
}

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <li *ngFor="let todo of todos; let index = index" [class.completed]="todo.completed">
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
  template: `
    <h1>Hello {{name}}!</h1>

    <p>
      Add a new todo:
      <input-box inputPlaceholder="New todo..."
        buttonLabel="Add"
        (inputText)="addTodo($event)">
      </input-box>
    </p>

    <p>Here's the list of pending todo items:</p>
    <todo-list [todos]="todos"
      (toggle)="toggleCompletion($event)">
    </todo-list>
  `
})
export class TodoApp {
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

@NgModule({
  imports: [BrowserModule, WorkerAppModule, FormsModule],
  declarations: [TodoList, InputBox, TodoApp],
  bootstrap: [TodoApp]
})
class AppModule {}

platformWorkerAppDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

