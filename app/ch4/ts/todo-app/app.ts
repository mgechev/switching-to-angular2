import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

interface Todo {
  completed: boolean;
  label: string;
}

@Component({
  selector: 'app',
  templateUrl: './app.html',
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
  todos: Todo[] = [{
    label: 'Buy milk',
    completed: false
  }, {
    label: "Save the world",
    completed: false
  }];

  name: string = 'John';

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


@NgModule({
  declarations: [TodoCtrl],
  imports: [BrowserModule],
  bootstrap: [TodoCtrl],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

