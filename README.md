# grunt-import-clean

> Identify unused imports in ES6 modules.

## Overview

`grunt-import-clean` is a simple plugin that identifies imports that are never referenced in modules utilizing the new ES6 syntax:

```javascript
import {
  $_is,
  $_slice,
  $_shift,
  $_pop,
  $_forEach,
  $_length
} from 'static/shared';

export default function Constructor() {
  // ...
}

Constructor.prototype = {
  // ...
};
```

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-import-clean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks( 'grunt-import-clean' );
```

## The import-clean task

### Overview
In your project's Gruntfile, add a section named `'import-clean'` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
  'import-clean': {
  target: [ /* target-specific file paths or patters go here. */ ],
  },
});
```

### Options

| Property | Type                  | Default | Description |
| -------- | --------------------- | ------- | ----------- |
| `force` | `Boolean` | `false` | A boolean value indicating whether grunt should continue if unused imports are detected. |
| `ignore` | `String` or `Array of String` | `[]` | The name(s) of unused imports to ignore. If ignored unused imports are detected, they will still be reported on with a warning. If *only* ignored unused imports are detected, grunt will continue. |
| `test` | `Boolean` | `false` | A boolean value indicating whether unit tests should be run. |

### Usage Examples

In this example, `'import-clean:all'` validates imports in all source files, while `'import-clean:some'` validates only specific files.

#### Configuration

```javascript
grunt.initConfig({
  'import-clean': {
  all: 'src/*.js',
  some: [ 'src/controller.js' , 'src/service.js' ]
  },
});
```

#### Output

```shell
# success

Validating imports in 5 files... ✓ OK
```

```shell
# error

Validating imports in 5 files...

"controller.js": [
  "$_is",
  "$_forEach"
],
"service.js": [
  "$_isArray"
]

Warning: found 3 unused imports in 2 files. Use --force to continue.
```


#### Configuration with `ignore` option

```javascript
grunt.initConfig({
  'import-clean': {
    all: 'src/*.js',
    some: [ 'src/Component.jsx' , 'src/service.js' ],
    options: {
      ignore: ['React']  // OR simply ignore: 'React', OR to ignore multiple imports ['React', 'SomethingElse']
    }
  },
});
```

#### Output with `ignore` option

```shell
# success (only ignored unused imports found, grunt continues)

Validating imports in 5 files...

"Component.jsx": [
  "React   (IGNORED)"
]

Warning: found 1 unused imports in 1 files (1 IGNORED). Use --force to continue.
```

```shell
# error (ignored and non-ignored unused imports found, grunt stops)

Validating imports in 5 files...

"Component.jsx": [
  "React   (IGNORED)",
  "$_forEach"
],
"service.js": [
  "$_isArray"
]

Warning: found 3 unused imports in 2 files (1 IGNORED). Use --force to continue.
```
