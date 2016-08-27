<p align="right"><a href="README.md">К оглавлению</a> | <a href="../en/how-to-use-nunjucks.md">English version</a> | Русская версия</p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17897591/600204cc-695d-11e6-9956-f19aad30f409.png" align="right"/>

# Как использовать Nunjucks?

В качестве альтернативы для HTML-препроцессора Pug вы можете использовать [Nunjucks](https://mozilla.github.io/nunjucks/). Для этого вам необходимо проделать несколько манипуляций:

> **Предупреждение**
>
> После замены HTML-препроцессора со стороны Yellfy не гарантируется стабильная работа. Также вы лишаетесь поддержки линтинга файлов.

**Шаг 0.**

Разверните новый экземпляр Yellfy одним из описанных в инструкции способов (см. раздел [«Установка и обновление»](installing.md)), установите зависимости, выполнив команду `npm i` в директории проекта и скопируйте в директорию `app/templates` интересующий вас вариант файлов шаблонизатора из репозитория [yellfy-templates](https://github.com/mrmlnc/yellfy-templates).

**Шаг 1.**

Удалите файл `npm-shrinkwrap.json` и `gulp/tasks/lint-templates.js`, а затем пошагово выполните ниже представленные команды:

  * `npm rm -D gulp-pug pug-lint yellfy-pug-inheritance`
  * `npm i -D gulp-nunjucks`
  * `npm shrinkwrap --dev`

**Шаг 2.**

Откройте файл `gulp/tasks/templates.js` и удалите следующие функции:

  * `pugErrorHandler`
  * `pugFilter`

Затем выполните замену:

```diff
const $ = use(
-  'yellfy-pug-inheritance as pugInheritance',
-  'gulp-filter',
-  'gulp-pug'
+  'gulp-nunjucks'
);
```

**Шаг 3.**

В этом же файле замените содержимое функции `task` на следующее:

```js
function task(done) {
  const changedFile = global.changedTemplateFile;
  if (!jsonDataCache || (changedFile && path.extname(changedFile) === '.json')) {
    jsonDataCache = getJsonData('app/templates/data');
  }

  if (typeof jsonDataCache !== 'object') {
    logger.error(`JSON syntax error: ${jsonDataCache}`);
    return done();
  }

  return $.gulp.src('app/templates/*.pug')
    .pipe($.nunjucks.compile(jsonDataCache).on('error', function(err) {
      nunjucksErrorHandler.bind(this, err, done)();
    }))
    .pipe($.gulp.dest('build'))
}
```

**Шаг 4.**

Добавьте обработчик ошибок:

```js
function nunjucksErrorHandler(err) {
  err.message.split('\n').forEach((line) => {
    console.log($.chalk.red('>> ') + line);
  });

  if (global.watch) {
    return this.emit('end');
  }

  done(err);
};
```
