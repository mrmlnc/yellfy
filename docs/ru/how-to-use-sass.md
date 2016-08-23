<p align="right"><a href="README.md">К оглавлению</a> | <a href="../en/how-to-use-sass.md">English version</a> | Русская версия</p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17897308/5fd2af7a-695c-11e6-9dea-76b062de64c6.png" align="right"/>

# Как использовать Sass?

В качестве альтернативы для CSS-препроцессора Less вы можете использовать [Sass](http://sass-lang.com/). Для этого вам необходимо проделать несколько манипуляций:

> **Предупреждение**
>
> После замены HTML-препроцессора со стороны Yellfy не гарантируется стабильная работа.

**Шаг 0.**

Разверните новый экземпляр Yellfy одним из описанных в инструкции способов (см. раздел [«Установка и обновление»](installing.md)), установите зависимости, выполнив команду `npm i` в директории проекта и скопируйте в директорию `app/styles` интересующий вас вариант CSS-фреймворка из репозитория [yellfy-styles](https://github.com/mrmlnc/yellfy-styles).

**Шаг 1.**

Удалите файл `npm-shrinkwrap.json` и пошагово выполните ниже представленные команды:

  * `npm rm -D gulp-less less-plugin-glob`
  * `npm i -D gulp-sass gulp-sass-glob`
  * `npm shrinkwrap --dev`

**Шаг 2.**

Откройте файл `gulp/tasks/styles.js` и выполните следующие изменения:

```diff
const $ = use(
  'gulp-sourcemaps',
-  'gulp-less',
-  'less-plugin-glob',
+  'gulp-sass',
+  'gulp-sass-glob',
  'gulp-postcss',
  'postcss-flexbugs-fixes as flexbugs',
  'autoprefixer'
);

...

function task(done) {
-  return $.gulp.src('app/styles/less/styles.less')
+  return $.gulp.src('app/styles/sass/styles.scss')
     .pipe($.sourcemaps.init())
+    .pipe($.sassGlob())
+    .pipe($.sass().on('error', function(err) {
+      sassErrorHandler.bind(this, err, done)();
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
+function sassErrorHandler(err) {
+  err.message.split('\n').forEach((line) => {
+    console.log($.chalk.red('>> ') + line);
+  });

+  if (global.watch) {
+    return this.emit('end');
+  }

+  done(err);
+}
```
