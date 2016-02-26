# Yellfy

> A simple set of tools for building fast, adaptive and modern web application or website that is easy to maintain in the future.

## Overview

**Yellfy** — is a project template for your new web application or website based on my personal preferences in the field of automation of the development process. The project is not a universal solution and is not intended to meet the needs of all developers. For this there is a Yeoman. However, feedback and comments are always welcome in the issues.

## Features

| Feature      | Summary                                                                                                                                                                                                                                |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Automation   | Yellfy optimized for continuous development. Just run Yellfy and write code. The process of adding images into the build, creating sprites, compiling preprocessor files and many other processes will be automatically performed.     |
| Modularity   | Yellfy aims to make the project modular. Template files and styles files are divided into modules, so you can copy them from project to the project when necessary. Style files will be picked up and are compiled automatically.      |
| adaptability | Yellfy built with [Normalize.css](http://necolas.github.io/normalize.css/) and includes a small CSS framework that combines only the most necessary: typography, lists, buttons, forms and tables.                                     |
| Friendliness | Yellfy created by people for people who make mistakes. Therefore, almost any errors that occur during the development process, will be processed and displayed in a concise and easy for understanding form.                           |

## Requirements

Yellfy requires a modern version of [Node.js](http://nodejs.org/) and globally installed [Bower](http://bower.io/).

## Installation

To install Yellfy, you can use a command-line utility [yellfy-cli](https://www.npmjs.com/package/yellfy-cli):

```
$ npm i -g yellfy-cli && yellfy -h
```

Or Git:

```
$ git clone git://github.com/mrmlnc/yellfy project-name && npm i
```

## Run

Just run the following command at your console:

```
$ gulp
```

## Description of tasks

| Task                | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `$ gulp`            | A full cycle of build the project and run the server on `8000` port.        |
| `$ gulp build`      | A full cycle of build the project and minification compiled files.          |
| `$ gulp server`     | Run the server on `80` port for the demonstration.                          |
| `$ gulp clean`      | Cleaning the temporary directory and directory of builds.                   |
| `$ gulp sync`       | One-way synchronization of core project files that cannot be compiled.      |
| `$ gulp sync:bower` | Creating symlink of Bower dependencies to the directory of build.           |
| `$ gulp lint`       | Linting scripts.                                                            |
| `$ gulp scripts`    | Transpiles ES2015 code to ES5 and concatenate JavaScript files.             |
| `$ gulp styles`     | Compile Less files, add vendor prefixes to rules and combine media queries. |
| `$ gulp templates`  | Compile Nunjucks files and inject Bower components.                         |
| `$ gulp compress`   | Compression of the generated files.                                         |

For a complete list of the commands, run the following command:

```
$ gulp --tasks
```

## Browser support

Yellfy uses **flexbox** for more efficient distribution of information in blocks that imposes some restrictions:

  * Chrome 34+
  * Android WebView 4.4+
  * Firefox 30+
  * Safari 7+
  * iOS 7+
  * Opera 12+
  * Internet Explorer 10+
  * Internet Explorer Mobile 10+
  * Edge 12+
  * Blackberry browser 10+

## Technology

##### Front-end

  * [Normalize.css](http://necolas.github.io/normalize.css) — A modern, HTML5-ready alternative to CSS resets.
  * [XY (flexbox)](https://github.com/mrmlnc/xy-flexbox) — is a small and very flexible collection of mixins for building grids based on flexbox.

##### Core

  * [Gulp](http://gulpjs.com) — Automate and enhance your workflow.
  * [BrowserSync](https://www.browsersync.io) — Time-saving synchronised browser testing.
  * [gulp-files-sync](https://www.npmjs.com/package/gulp-files-sync) — One-way synchronization of directories.

##### Templates

  * [Nunjucks](https://mozilla.github.io/nunjucks) — A rich and powerful templating language for JavaScript.
    * [quaff](https://www.npmjs.com/package/quaff) — A data pipeline helper written in node to convert a folder of JSON/YAML/CSV/TSV files into usable data.
  * [gulp-jsbeautifier](https://www.npmjs.com/package/gulp-jsbeautifier) — Reformat and reindent HTML files.
  * [Wiredep](https://www.npmjs.com/package/wiredep) — Wire Bower dependencies to your source code.

##### Stylesheets

  * [Less](http://lesscss.org) — Less makes CSS fun again.
    * [less-plugin-glob](https://www.npmjs.com/package/less-plugin-glob) — Globbing support for LESS.
  * [CleanCSS](https://www.npmjs.com/package/clean-css) — CSS Optimization.
  * [PostCSS](https://www.npmjs.com/package/postcss) — A tool for transforming styles with JS plugins.
    * [Autoprefixer](https://www.npmjs.com/package/autoprefixer) — Parse CSS and add vendor prefixes to rules by Can I Use.

##### Scripts

  * [Babel](https://babeljs.io/) — A compiler for writing next generation JavaScript.
    * [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) — Babel preset for all es2015 plugins.
  * [XO](https://www.npmjs.com/package/xo) — JavaScript happiness style linter.
  * [UglifyJS](https://www.npmjs.com/package/uglify-js) — A JavaScript parser, minifier, compressor or beautifier toolkit.

##### Images

  * [imagemin](https://www.npmjs.com/package/imagemin) — Minify images seamlessly.

##### Miscellaneous

  * [gulp-watch](https://www.npmjs.com/package/gulp-watch) — File watcher that uses super-fast chokidar.
  * [gulp-newer](https://www.npmjs.com/package/gulp-newer) — Passing through only those source files that are newer than corresponding destination files.
  * [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) — Source map support for Gulp.js.

## License

MIT
