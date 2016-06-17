importScripts('/node_modules/systemjs/dist/system.src.js',
              '/node_modules/reflect-metadata/Reflect.js',
              '/node_modules/zone.js/dist/zone.js',
              './config.js');

System.import('./background_app.js')
.then(() => console.log('The application has started successfully'),
  error => console.error('error loading background', error));

