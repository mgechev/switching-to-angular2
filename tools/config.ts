import {readFileSync} from 'fs';
import {normalize, join} from 'path';
import {argv} from 'yargs';


// --------------
// Configuration.
export const ENV                  = argv['env']         || 'dev';
export const DEBUG                = argv['debug']       || false;
export const PORT                 = argv['port']        || 5555;
export const PROJECT_ROOT         = normalize(join(__dirname, '..'));
export const LIVE_RELOAD_PORT     = argv['reload-port'] || 4002;
export const DOCS_PORT            = argv['docs-port']   || 4003;
export const APP_BASE             = argv['base']        || '/';

export const APP_TITLE            = 'My Angular2 App';

export const APP_SRC              = 'app';
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const TMP_DIR              = 'tmp';
export const TEST_DEST            = 'test';
export const DOCS_DEST            = 'docs';
export const APP_DEST             = `dist/${ENV}`;
export const ASSETS_DEST          = `${APP_DEST}/assets`;
export const BUNDLES_DEST         = `${APP_DEST}/bundles`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const FONTS_DEST           = `${APP_DEST}/fonts`;
export const LIB_DEST             = `${APP_DEST}/lib`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
export const VERSION              = appVersion();

export const VERSION_NPM          = '2.14.7';
export const VERSION_NODE         = '4.0.0';

// Declare NPM dependencies (Note that globs should not be injected).
export const NPM_DEPENDENCIES = [
  { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },

  { src: 'es6-shim/es6-shim.min.js', inject: 'shims', dest: LIB_DEST },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: LIB_DEST },
  { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: LIB_DEST },
  { src: 'zone.js/dist/zone.js', inject: 'shims', dest: LIB_DEST },

  // Faster dev page load
  { src: 'rxjs/bundles/Rx.min.js', inject: 'libs', dest: LIB_DEST },

  { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true, dest: CSS_DEST }
];

// Declare local files that needs to be injected
export const APP_ASSETS = [
  { src: `${ASSETS_SRC}/main.css`, inject: true, dest: CSS_DEST }
];

NPM_DEPENDENCIES
  .filter(d => !/\*/.test(d.src)) // Skip globs
  .forEach(d => d.src = require.resolve(d.src));

export const DEPENDENCIES = NPM_DEPENDENCIES.concat(APP_ASSETS);


// ----------------
// SystemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    'bootstrap': `${APP_ROOT}bootstrap`,
    'markdown': '/node_modules/markdown/lib/markdown',
    'immutable': '/node_modules/immutable/dist/immutable.js',
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
    '*': '/node_modules/*'
  }
};

const SYSTEM_CONFIG_PROD = {
  defaultJSExtensions: true,
  bundles: {
    'bundles/app': ['bootstrap']
  }
};

export const SYSTEM_CONFIG = ENV === 'dev' ? SYSTEM_CONFIG_DEV : SYSTEM_CONFIG_PROD;

// This is important to keep clean module names as 'module name == module uri'.
export const SYSTEM_CONFIG_BUILDER = {
  defaultJSExtensions: true,
  paths: {
    '*': `${TMP_DIR}/*`,
    'rxjs/*': 'node_modules/rxjs/*'
  },
  map: {
    'rxjs': '/node_modules/rxjs',
    '@angular': '/node_modules/@angular'
  },
  packages: {
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router-deprecated': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    // '@angular/router': {
    //   main: 'index.js',
    //   defaultExtension: 'js'
    // },
    'rxjs': {
      defaultExtension: 'js'
    }
  }
};


// --------------
// Private.
function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}
