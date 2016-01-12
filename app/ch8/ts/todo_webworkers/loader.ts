importScripts("/node_modules/systemjs/dist/system.src.js",
              "/node_modules/angular2/bundles/web_worker/worker.dev.js",
              "/node_modules/angular2/bundles/angular2-polyfills.js");

System.config({
  baseURL: '/dist/dev/ch8/ts/todo_webworkers/',
});

System.import('./background_app.js')
.then(() => console.log('The application has started successfully'),
  error => console.error('error loading background', error));
