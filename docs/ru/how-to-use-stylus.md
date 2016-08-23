<p align="right"><a href="README.md">К оглавлению</a> | <a href="../en/how-to-use-stylus.md">English version</a> | Русская версия</p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17896251/9bf01dd4-6958-11e6-8c93-3a311d1bc7d1.png" align="right"/>

# Как использовать Stylus?

В качестве альтернативы для CSS-препроцессора Less вы можете использовать [Stylus](http://stylus-lang.com/). Для этого вам необходимо проделать несколько манипуляций:

> **Предупреждение**
>
> После замены CSS-препроцессора со стороны Yellfy не гарантируется стабильная работа. Также вы лишаетесь поддержки линтинга файлов, так как Stylelint не поддерживает Stylus.

**Шаг 0.**

Разверните новый экземпляр Yellfy одним из описанных в инструкции способов (см. раздел [«Установка и обновление»](installing.md)), установите зависимости, выполнив команду `npm i` в директории проекта и скопируйте в директорию `app/styles` интересующий вас вариант CSS-фреймворка из репозитория [yellfy-styles](https://github.com/mrmlnc/yellfy-styles).

**Шаг 1.**

Удалите файл `npm-shrinkwrap.json`, `gulp/tasks/lint-styles.js` и `gulp/config/stylelint.js`, а затем пошагово выполните ниже представленные команды:

  * `npm rm -D gulp-less less-plugin-glob stylelint stylelint-config-standard`
  * `npm i -D gulp-stylus`
  * `npm shrinkwrap --dev`

**Шаг 2.**

Откройте файл `gulp/tasks/styles.js` и выполните следующие изменения:

```diff
const $ = use(
  'gulp-sourcemaps',
-  'gulp-less',
-  'less-plugin-glob',
+  'gulp-stylus',
  'gulp-postcss',
  'postcss-flexbugs-fixes as flexbugs',
  'autoprefixer'
);

...

function task(done) {
-  return $.gulp.src('app/styles/less/styles.less')
+  return $.gulp.src('app/styles/stylus/styles.styl')
     .pipe($.sourcemaps.init())
+    .pipe($.stylus().on('error', function(err) {
+      stylusErrorHandler.bind(this, err, done)();
+    }))
-    .pipe($.less({
-      plugins: [$.lessPluginGlob]
-    }).on('error', function(err) {
-      lessErrorHandler.bind(this, err, done)();
-    }))
```

**Шаг 3.**

Замените обработчик ошибок `lessErrorHandler` на предложенный ниже или напишите свой собственный.

```diff
+function stylusErrorHandler(err) {
+  err.message.split('\n').forEach((line) => {
+    console.log($.chalk.red('>> ') + line);
+  });

+  if (global.watch) {
+    return this.emit('end');
+  }

+  done(err);
+}
```
