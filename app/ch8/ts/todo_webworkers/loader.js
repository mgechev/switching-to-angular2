importScripts("/node_modules/systemjs/dist/system.src.js",
              "/node_modules/angular2/bundles/web_worker/worker.dev.js",
              "/node_modules/angular2/bundles/angular2-polyfills.js");

System.config({
  packages: {
    app: {
      defaultJSExtensions: true
    }
  },
  baseURL: '/dist/dev/ch8/ts/todo_webworkers/',
  paths: {
    bootstrap : '/dist/dev/bootstrap',
    app: './app.js'
  }
});

System.import('./background_bootstrap.js')
.then(
  function(m) {
    try {
      m.main();
    } catch (e) {
      console.error(e);
    }
  },
  function(error) { console.error('error loading background', error); });
