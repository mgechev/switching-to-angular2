import {join, sep} from 'path';
import {APP_SRC, APP_DEST, DEPENDENCIES, SYSTEM_CONFIG, ENV} from '../config';
import {transformPath, templateLocals} from '../utils';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_SRC, '**', 'index.html'))
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject())
      .pipe(plugins.template(
        require('merge')(templateLocals(), {
          TITLE: 'Switching to Angular 2',
          INIT: `
<script>
  System.config(${JSON.stringify(SYSTEM_CONFIG)});
  System.import("./app")
    .catch(function (e) {
      console.log("Report this error to https://github.com/mgechev/switching-to-angular2/issues", e);
    });
</script>`
        })
      ))
      .pipe(gulp.dest(APP_DEST));
  };


  function inject() {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(), { read: false }), {
      transform: transformPath(plugins, 'dev')
    });
  }

  function getInjectablesDependenciesRef() {
    let shims = DEPENDENCIES.filter(dep => dep['inject'] && dep['inject'] === 'shims');
    let libs = DEPENDENCIES.filter(dep => dep['inject'] && dep['inject'] === 'libs');
    let all = DEPENDENCIES.filter(dep => dep['inject'] && dep['inject'] === true);
    return shims.concat(libs).concat(all).map(mapPath);
  }

  function mapPath(dep) {
    let prodPath = join(dep.dest, dep.src.split(sep).pop());
    return ('prod' === ENV ? prodPath : dep.src );
  }
};
