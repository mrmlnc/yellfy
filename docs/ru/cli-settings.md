<p align="right"><a href="README.md">К оглавлению</a> | <a href="../en/cli-settings.md">English version</a> | Русская версия</p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17893807/b190039c-694f-11e6-8be4-3299bacc6406.png" align="right"/>

# Настройки Yellfy CLI

**Yellfy CLI** [[документация](https://github.com/mrmlnc/yellfy-cli)] — это простая консольная утилита, упрощающая процесс развёртывания нового экземпляра Yellfy, а также создание новых страниц и компонентов.




<br/>
## Настройки препроцессоров

В Yellfy вы можете использовать консольную утилиту для создания страниц (`yellfy -p new-page`) или компонентов (`yellfy -c new-component`). По умолчанию в Yellfy используется Pug и Less, как HTML- и CSS-препроцессор, соответственно. Для того, чтобы изменить препроцессор, необходимо использовать секцию `yellfy` в файле `package.json`.

```json
{
  "yellfy": {
    "templates": "gulp/templates",
    "html": "pug",
    "css": "less"
  }
}
```

Например, если вы собираетесь использовать Sass (SCSS-синтаксис), как CSS-препроцессор и хотите пользоваться консольной утилитой для генерации страниц или компонентов, вам необходимо изменить значение поля `yellfy.css` на `scss`.

По умолчанию на выбор доступны три CSS-препроцессора и два HTML-препроцессора:

  * `less` — Less
  * `scss` — Sass
  * `styl` — Stylus
  * `pug` — Pug/Jade
  * `njk` — Nunjucks

Также вы можете изменить директорию, в которой консольная утилита будет искать файлы шаблонов, используя поле `yellfy.templates` или добавить интересующий вас препроцессор, создав специальные файлы страниц и компонентов в директории шаблонов.




<br/>
## Шаблоны страниц и компонентов

По умолчанию все шаблоны хранятся в директории `gulp/templates` (см. раздел [«Структура проекта»](structure.md#Шаблоны-1)) и имеют имя, заданное по шаблону `ресурс.тип.язык.tpl`.

При генерации страницы или компонента консольная утилита будет искать файлы по следующим шаблонам:

**Для генерации страницы**

  * HTML
    * `page.index.pug.tpl`
    * `page.index.njk.tpl`
    * `page.markup.pug.tpl`
    * `page.markup.njk.tpl`
  * CSS
    * `page.styles.less.tpl`
    * `page.styles.scss.tpl`
    * `page.styles.styl.tpl`

**Для генерации компонента**

  * HTML
    * `component.markup.pug.tpl`
    * `component.markup.njk.tpl`
  * CSS
    * `component.styles.less.tpl`
    * `component.styles.scss.tpl`
    * `component.styles.styl.tpl`

Любой из файлов может быть изменён в соответствии с вашими предпочтениями.
