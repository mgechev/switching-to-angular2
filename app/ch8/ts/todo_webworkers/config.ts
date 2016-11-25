System.config({
  baseURL: '/dist/dev/ch8/ts/todo_webworkers/',
  map: {
    'rxjs': '/node_modules/rxjs',
  },
  paths: {
    bootstrap: '/dist/dev/bootstrap',
    '@angular/common': '/node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '/node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/core': '/node_modules/@angular/core/bundles/core.umd.js',
    '@angular/forms': '/node_modules/@angular/forms/bundles/forms.umd.js',
    '@angular/http': '/node_modules/@angular/http/bundles/http.umd.js',
    '@angular/platform-browser': '/node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': '/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/router': '/node_modules/@angular/router/bundles/router.umd.js',
    '@angular/platform-webworker': '/node_modules/@angular/platform-webworker/bundles/platform-webworker.umd.js',
    '@angular/platform-webworker-dynamic': '/node_modules/@angular/platform-webworker-dynamic/bundles/platform-webworker-dynamic.umd.js',

    '@angular/common/testing': '/node_modules/@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': '/node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/core/testing': '/node_modules/@angular/core/bundles/core-testing.umd.js',
    '@angular/http/testing': '/node_modules/@angular/http/bundles/http-testing.umd.js',
    '@angular/platform-browser/testing':
      '/node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing':
      '/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/router/testing': '/node_modules/@angular/router/bundles/router-testing.umd.js',
  },
  packages: {
    // '@angular/router': {
    //   main: 'index.js',
    //   defaultExtension: 'js'
    // },
    'rxjs': {
      defaultExtension: 'js'
    }
  }
});
