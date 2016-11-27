/// <reference path="../../../../node_modules/immutable/dist/immutable.d.ts"/>

import {NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import * as Immutable from 'immutable';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'input-box',
  template: `
    <input #todoInput [placeholder]="inputPlaceholder">
    <button (click)="emitText(todoInput.value); todoInput.value = '';">
      {{buttonLabel}}
    </button>
  `
})
class InputBox {
  @Input() inputPlaceholder: string;
  @Input() buttonLabel: string;
  @Output() inputText = new EventEmitter<string>();

  emitText(text: string) {
    this.inputText.emit(text);
  }
}

@Component({
  selector: 'todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li *ngFor="let todo of todos; let index = index" [class.completed]="todo.get('completed')">
        <input type="checkbox" [checked]="todo.get('completed')"
          (change)="toggleCompletion(index)">
        {{todo.get('label')}}
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
  @Input() todos;
  @Output() toggle = new EventEmitter<number>();

  toggleCompletion(index: number) {
    this.toggle.emit(index);
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
class TodoApp {
  todos = Immutable.fromJS([{
    label: 'Buy milk',
    completed: false
  }, {
    label: 'Save the world',
    completed: false
  }]);

  name: string = 'John';

  addTodo(label: string) {
    this.todos = this.todos.push(Immutable.fromJS({
      label,
      completed: false
    }));
  }
  toggleCompletion(index: number) {
    this.todos = this.todos.update(index, todo => {
      return Immutable.fromJS({
        label: todo.get('label'),
        completed: !todo.get('completed')
      });
    });
  }
}

@NgModule({
  declarations: [TodoList, InputBox, TodoApp],
  imports: [BrowserModule],
  bootstrap: [TodoApp],
})
class TodoAppModule {}

platformBrowserDynamic().bootstrapModule(TodoAppModule);

