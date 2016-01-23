# Yellfy

> Простой набор инструментов для построения быстрого, адаптивного и современного веб-приложения или сайта, который легко поддерживать в будущем.

## Обзор

Yellfy — это шаблон проекта для вашего нового веб-приложения или сайта, основанный на моих личных предпочтениях в области автоматизации процесса разработки. Проект не является универсальным решением и не преследует цели обеспечить потребности всех разработчиков. Для этого есть Yeoman. Однако, пожелания и замечания всегда приветствуются в issues.

## Особенности

##### Автоматизация

Yellfy максимально оптимизирован для беспрерывной разработки. Просто запустите Yellfy и пишите код. Процесс добавления изображений в билд, создание спрайтов, компиляция файлов препроцессоров и многие другие процессы будут выполняться автоматически.

##### Модульность

Yellfy преследует цель сделать проекты модульными. Файлы шаблонов и стилей разбиты на модули, что позволяет копировать их из проекта в проект при необходимости. При этом файлы стилей будут подхвачены и скомпилированы автоматически.

##### Адаптивность

Yellfy построен на [Normalize.css](http://necolas.github.io/normalize.css/) и включает в себя небольшой CSS-фреймворк, сочетающий в себя лишь самое необходимое: Типографику, списки, кнопки, формы и таблицы.

##### Дружелюбность

Yellfy создан людьми для людей, которым свойственно ошибаться. Поэтому практически все ошибки, возникающие в процессе разразработки, будут обработаны и отображены в кратком и удобном для осмысления виде.

##### Технологии

Yellfy использует сборщик [Gulp](http://gulpjs.com/), препроцессор [Nunjucks](https://mozilla.github.io/nunjucks/) для шаблонов, [Less](http://lesscss.org/) для стилей, [Autoprefixer](https://github.com/postcss/autoprefixer) для автоматичекой расстановки префиксов, [Babel](https://babeljs.io/) для современного JavaScript, [XO](https://github.com/sindresorhus/xo) для проверки JavaScript-кода, [BrowserSync](https://www.browsersync.io/) для синхронизации и перезагрузки состояния страниц на устройствах, а также многие другие технологии, позволяющие упростить процесс разработки.

## Системные требования

Yellfy требует наличие современной версии [Node.js](http://nodejs.org/) и глобально установленного [Bower](http://bower.io/).

## Установка

Для установки Yellfy можно использовать специальную консольную утилиту [yellfy-cli](https://www.npmjs.com/package/yellfy-cli):

```shell
$ npm i -g yellfy-cli && yellfy -h
```

Или Git:

```shell
$ git clone git://github.com/mrmlnc/yellfy project-name && npm i
```

## Описание задач

#### Основные задачи

  * `$ gulp` — Задача запускает полный цикл сборки проекта и сервер на `8000` порту.
  * `$ gulp build` — Полный цикл сборки проекта и минификация скомпилированных файлов.
  * `$ gulp server` — Запуск сервера на `80` порту для демонстрации проекта.

#### Вспомогательные задачи

  * `$ gulp clean` — Очистка временной директории и директории сборок.
  * `$ gulp sync` — Односторонняя синхронизация основных файлов проекта не подлежащих компиляции.
  * `$ gulp sync:bower` — Односторонняя синхронизация зависимостей Bower в директорию сборок.
  * `$ gulp lint` — Проверка скриптов.
  * `$ gulp scripts` — Трансформация ES2015 файлов в ES5 и их конкатенация в один общий файл.
  * `$ gulp styles` — Компиляция Less-файлов в CSS-файл и его последующая обработка с помощью PostCSS.
  * `$ gulp templates` — Компиляция файлов шаблонизатора Nunjucks, их реиндентация и встраивание зависимостей Bower.
  * `$ gulp sprites` — Создание SVG-спрайта.
  * `$ gulp compress` — Минификация JS- и CSS-файлов, а также изображений.

## Поддержка браузеров

Yellfy использует flexbox для более эффективного распределения информации в блоках, что накладывает некоторые ограничения:

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

# Technology

## Core

  * [Gulp](http://gulpjs.com) — Automate and enhance your workflow.
  * [BrowserSync](https://www.browsersync.io) — Time-saving synchronised browser testing.
  * [gulp-files-sync](https://www.npmjs.com/package/gulp-files-sync) — One-way synchronization of directories.

## Templates

  * [Nunjucks](https://mozilla.github.io/nunjucks) — A rich and powerful templating language for JavaScript.
    * [quaff](https://www.npmjs.com/package/quaff) — A data pipeline helper written in node to convert a folder of JSON/YAML/CSV/TSV files into usable data.
  * [gulp-jsbeautifier](https://www.npmjs.com/package/gulp-jsbeautifier) — Reformat and reindent HTML files.
  * [Wiredep](https://www.npmjs.com/package/wiredep) — Wire Bower dependencies to your source code.

## Stylesheets

  * [Less](http://lesscss.org) — Less makes CSS fun again.
    * [less-plugin-glob](https://www.npmjs.com/package/less-plugin-glob) — Globbing support for LESS.
  * [CleanCSS](https://www.npmjs.com/package/clean-css) — CSS Optimization.
  * [PostCSS](https://www.npmjs.com/package/postcss) — A tool for transforming styles with JS plugins.
    * [Autoprefixer](https://www.npmjs.com/package/autoprefixer) — Parse CSS and add vendor prefixes to rules by Can I Use.
    * [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker) — Pack same CSS media query rules into one media query rule.

## Scripts

  * [Babel](https://babeljs.io/) — A compiler for writing next generation JavaScript.
    * [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) — Babel preset for all es2015 plugins.
  * [XO](https://www.npmjs.com/package/xo) — JavaScript happiness style linter.
  * [UglifyJS](https://www.npmjs.com/package/uglify-js) — A JavaScript parser, minifier, compressor or beautifier toolkit.

## Images

  * [imagemin](https://www.npmjs.com/package/imagemin) — Minify images seamlessly.
  * [svg-sprite](https://www.npmjs.com/package/svg-sprite) — Optimize SVG files and creating SVG sprites.

## Miscellaneous

  * [gulp-watch](https://www.npmjs.com/package/gulp-watch) — File watcher that uses super-fast chokidar.
  * [gulp-newer](https://www.npmjs.com/package/gulp-newer) — Passing through only those source files that are newer than corresponding destination files.
  * [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) — Source map support for Gulp.js.


## License

MIT
