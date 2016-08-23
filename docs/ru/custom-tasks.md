<p align="right"><a href="README.md">К оглавлению</a> | <a href="../en/custom-tasks.md">English version</a> | Русская версия</p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17891484/ccdd4d72-6944-11e6-85e7-626c812e4f1a.png" align="right"/>

# Написание собственных задач

Yellfy использует собственный загрузчик задач Gulp и внедряет новый механизм `use` (опционально) для упрощения написания задач.




<br/>
## Организация задач

Все задачи хранятся в директории `gulp/tasks` и формируются по стандартному шаблону:

```js
'use strict';

const $ = use();

function task() {
  // Code
}

module.export = {
  task,
  description: 'description'
}
```

Имя задачи соответствует имени файла, в котором она определена. Каждая задача проходит валидацию перед исполнением, при которой проверяется наличие функции `task` и, если есть, что `description` является строкой.




<br/>
## Механизм `use`

Для упрощения написания задач в Yellfy используется собственный модуль `yellfy-use`, который привносит несколько опциональных возможностей.

Проще говоря, это **система загрузки зависимостей**. Рассмотрим типичный пример объявления переменных в одной из задач Gulp:

```js
const path = require('path');

const gulp = require('gulp');
const filter = require('gulp-filter');
const pug = require('gulp-pug');
const pugInheritance = require('yellfy-pug-inheritance');

const pathHelpers = require('../helpers/paths');
```

В этом примере присутствует много шума, а также лишних действий, которые можно делать автоматически. Например, в каждой задаче будет использоваться `gulp` и, скорее всего помощники, которые хранятся в директории `gulp/helpers` (см. раздел [Структура проекта](structure.md#Помощники)).

Таким образом, используя механизм `use` можно сократить запись до:

```js
const $ = use(
  'gulp-filter',
  'gulp-pug',
  'yellfy-pug-inheritance as pugInheritance'
);
```

> **Внимание**
>
> Имена указанных зависимостей и помощников автоматически приводятся к **camelCase** нотации в том случае, если не используется частица `as`, которая позволяет переименовывать зависимости.

После исполнения кода выше в переменной `$` будет находиться всё самое необходимое для задачи:

```json
{
  "gulp": "...",
  "helpers": {
    "paths": "..."
  },
  "pug": "...",
  "filter": "...",
  "pugInheritance": "..."
}
```




<br/>
## Написание простых задач

Как и в случае с обычными задачами Gulp, не забывайте возвращать поток.

```js
'use strict';

const $ = use('gulp-xo');

function task() {
  return $.gulp.src(['**/*.js'], { cwd: 'app/scripts' })
    .pipe($.xo());
}

module.exports = {
  task
};
```




<br/>
## Задачи, зависящие от других задач

В некоторых задачах может потребоваться вызвать другие задачи. Для этого используется два метода: `gulp.series` и `gulp.parallel`. Оба метода не требуют `return` — вместо этого установите `done`.

```js
'use strict';

const $ = use();

function task(done) {
  $.gulp.series(
    'clean',
    'lint',
    'sprite',
    $.gulp.parallel('sync', 'templates', 'scripts', 'styles'),
    'compress'
  )(done);
}

module.exports = {
  task
};
```
