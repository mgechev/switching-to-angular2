import {NgModule, Component, ContentChild, TemplateRef, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

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
  template: `
    <ul>
      <template *ngFor="let todo of todos; template: itemsTemplate">
      </template>
    </ul>
  `
})
class TodoList {
  @Input() todos: Todo[];
  @Input() itemsTemplate: TemplateRef<any>;
  @Output() toggle = new EventEmitter<Todo>();
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
      (toggle)="toggleCompletion($event)"
      [itemsTemplate]="itemsTemplate">
    </todo-list>
  `
})
class TodoApp {
  todos: Todo[] = [{
    label: 'Buy milk',
    completed: false
  }, {
    label: 'Save the world',
    completed: false
  }];
  name: string = 'John';
  @ContentChild(TemplateRef) itemsTemplate: TemplateRef<any>;

  addTodo(label: string) {
    this.todos.push({
      label,
      completed: false
    });
  }
}

@Component({
  selector: 'app',
  styles: [`
    .completed {
      text-decoration: line-through;
    }`
  ],
  template: `
    <todo-app>
      <template let-todo>
        <input type="checkbox" [checked]="todo.completed"
          (change)="todo.completed = !todo.completed;">
        <span [class.completed]="todo.completed">
          {{todo.label}}
        </span><br>
      </template>
    </todo-app>
  `
})
class App {}


@NgModule({
  declarations: [TodoList, InputBox, TodoApp, App],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

