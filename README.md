<p align="right">English description | <a href="README_RU.md">Описание на русском</a></p>

![Yellfy](https://cloud.githubusercontent.com/assets/7034281/13556752/b408c3bc-e3f2-11e5-9936-cb3cc02fb7de.png)

## Yellfy

**Yellfy** — is a project template for your new web application or website based on my personal preferences in the field of automation of the development process. The project is not a universal solution and is not intended to meet the needs of all developers. For this there is a Yeoman. However, feedback and comments are always welcome in the issues.

[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/yellfy.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy#info=devDependencies)

## Features

| Feature      | Summary                                                                                                                                                                                                                                |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Automation   | Yellfy optimized for continuous development. Just run Yellfy and write code. The process of adding images into the build, creating sprites, compiling preprocessor files and many other processes will be automatically performed.     |
| Modularity   | Yellfy aims to make the project modular. Template files and styles files are divided into modules, so you can copy them from project to the project when necessary. Style files will be picked up and are compiled automatically.      |
| Adaptability | Yellfy built with [Normalize.css](http://necolas.github.io/normalize.css/) and includes a small CSS framework that combines only the most necessary: typography, lists, buttons, forms and tables.                                     |
| Friendliness | Yellfy created by people for people who make mistakes. Therefore, almost any errors that occur during the development process, will be processed and displayed in a concise and easy for understanding form.                           |

## Requirements

Yellfy requires a modern version of [Node.js](http://nodejs.org/) (only v6.0.0+) and globally installed [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/).

```
$ npm i -g gulp-cli bower
```

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

| Task                | Description                                                            |
|---------------------|------------------------------------------------------------------------|
| `$ gulp`            | A full cycle of build the project and run the server on `8000` port.   |
| `$ gulp build`      | A full cycle of build the project and minification compiled files.     |
| `$ gulp clean`      | Cleaning the temporary directory and directory of builds.              |
| `$ gulp sync`       | One-way synchronization of core project files that cannot be compiled. |
| `$ gulp sync-bower` | Creating symlink of Bower dependencies to the directory of build.      |
| `$ gulp xo`         | Linting scripts.                                                       |
| `$ gulp scripts`    | Creating script bundle with Rollup.                                    |
| `$ gulp test`       | Run mocha tests.                                                       |
| `$ gulp styles`     | Compile Less files, add vendor prefixes to rules.                      |
| `$ gulp templates`  | Compile Pug files, inject Bower components.                            |
| `$ gulp compress`   | Compression of the generated files.                                    |

For a complete list of the commands, run the following command:

```
$ gulp --tasks
```

## Browser support

Yellfy uses **flexbox** for more efficient distribution of information in blocks that imposes some restrictions:

  * Chrome 34+
  * Android WebView 4+
  * Firefox 30+
  * Safari 7+
  * iOS 7+
  * Opera 12+
  * Internet Explorer 10+
  * Internet Explorer Mobile 10+
  * Edge 12+
  * Blackberry browser 10+

## How to write tasks?

See [wiki](https://github.com/mrmlnc/yellfy/wiki/how-to-write-tasks) page.

## Technology

See [package.json](https://github.com/mrmlnc/yellfy/blob/master/package.json).

## License

MIT
