<p align="right"><a href="README.md">English description</a> | Описание на русском</p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17787516/1d6d51da-6592-11e6-925b-b0f141b8e4f0.png" align="right"/>

# Yellfy

Yellfy — это простой шаблон проекта, разработанный специально для тех, кто не хочет тратить время на настройку рабочего окружения. В основе Yellfy лежит проверенный временем инструментарий и некоторые новые решения, которые были специально разработаны для этого проекта.




## Чем этот проект отличается от других?

Проект Yellfy не является универсальным решением и не преследует цели обеспечить потребности всех разработчиков. Для этого есть Yeoman или, такие комбайны, как [tars](https://github.com/tars/tars).

Перед Yellfy стоит задача предоставления максимально оптимизированного и документированного рабочего окружения без сотен лишних зависимостей. Специально для Yellfy был разработан собственный загрузчик зависимостей ([yellfy-use](https://github.com/mrmlnc/yellfy-use)), менеджер задач Gulp ([yellfy-loader](https://github.com/mrmlnc/yellfy-loader)), модуль инкрементальной сборки Pug ([yellfy-pug-inheritance](https://github.com/mrmlnc/yellfy-pug-inheritance)) и генератор спрайтов ([yellfy-svg-sprite](https://github.com/mrmlnc/yellfy-svg-sprite)). Кроме того, была разработана консольная утилита ([yellfy-cli](https://github.com/mrmlnc/yellfy-cli)), позволяющая развёртывать новые экземпляры Yellfy, а также создавать страницы и компоненты.


### Автоматизация

<img src="https://cloud.githubusercontent.com/assets/7034281/17788726/bd9785c2-6597-11e6-8fab-97810c42987d.png" align="left"/>

Yellfy максимально оптимизирован для беспрерывной разработки. Просто запустите Yellfy и пишите код. Процесс добавления изображений в билд, создание спрайтов, компиляция файлов препроцессоров и многие другие процессы будут выполняться автоматически.

### Модульность

<img src="https://cloud.githubusercontent.com/assets/7034281/17788847/38ba5662-6598-11e6-96ca-b1a2a1dbf910.png" align="left"/>

Yellfy преследует цель сделать проекты модульными. Файлы шаблонов, стилей и скриптов разбиты на модули, что позволяет копировать их из проекта в проект при необходимости. При этом файлы стилей будут подхвачены и скомпилированы автоматически.

### Адаптивность

<img src="https://cloud.githubusercontent.com/assets/7034281/17789156/93bbac4a-6599-11e6-9bb1-bf0a0a892794.png" align="left"/>

Yellfy построен на [Normalize.css](http://necolas.github.io/normalize.css/) и включает в себя микро CSS-фреймворк, включающий в себя лишь всё самое необходимое для быстрого старта работы над практически любым проектом: типографику, сетку (flexbox и, по желанию, float), кнопки, формы, списки и таблицы.

### Дружелюбность

<img src="https://cloud.githubusercontent.com/assets/7034281/17789317/678a8dc0-659a-11e6-9c17-08abd71ea32a.png" align="left"/>

Yellfy создан людьми для людей, которым свойственно ошибаться. Поэтому большинство ошибок, возникающих в процессе разразработки, будут обработаны и отображены в кратком и удобном для человека виде.




<br/><br/>
## Документация

Подробная и актуальная документация проекта доступна в директории [`docs`](https://github.com/mrmlnc/yellfy/tree/2.0.0/docs).




<br/><br/>
## Плагины для редакторов

Для совместной работы с Yellfy рекомендуются следующие плагины для редакторов:

### [Visual Studio Code](https://code.visualstudio.com)

  * [editorconfig-vscode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  * [vscode-puglint](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-puglint)
  * [vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
  * [vscode-linter-xo](https://marketplace.visualstudio.com/items?itemName=samverschueren.linter-xo)




<br/><br/>
## Имеет отношение

Репозиторий, содержащий версии CSS-фреймворка для Less, Sass и Stylus:

  * [yellfy-styles](https://github.com/mrmlnc/yellfy-styles)

Репозиторий, содержащий версии шаблонов (Pug, Nunjucks):

  * [yellfy-styles](https://github.com/mrmlnc/yellfy-styles)

Репозитории проектов, созданных специально для Yellfy:

  * [yellfy-cli](https://github.com/mrmlnc/yellfy-cli)
  * [yellfy-use](https://github.com/mrmlnc/yellfy-use)
  * [yellfy-loader](https://github.com/mrmlnc/yellfy-loader)
  * [yellfy-pug-inheritance](https://github.com/mrmlnc/yellfy-pug-inheritance)
  * [yellfy-svg-sprite](https://github.com/mrmlnc/yellfy-svg-sprite)




<br/><br/>
## История изменений

Для получения полной информации о каждой версии перейдите в [раздел релизов нашего проекта на GitHub](https://github.com/mrmlnc/yellfy/releases).




<br/><br/>
## Лицензия

Это программное обеспечение распространяется по условиям лицензии MIT.
