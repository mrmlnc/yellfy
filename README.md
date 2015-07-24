# Raptorius Web Kit

[![Join the chat at https://gitter.im/mrmlnc/raptorius-web-kit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mrmlnc/rwk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Простой набор инструментов, сочетающий в себе всё самое необходимое для быстрого развёртывания шаблона нового веб-приложения и дальнейшего его обслуживания во время разработки.

Проект Raptorius Web Kit (далее RWK) не позиционируется как решение, покрывающее потребности всех разработчиков. Тем не менее, вы можете влиять на присутствующий и отсутствующий функционал посредством раздела [Issues](https://github.com/mrmlnc/raptorius-web-kit/issues).

## Функционал

На данный момент в RWK присутствует следующий функционал:

 * **Компиляторы**
   * [Less](http://lesscss.org/)
     * [less-plugin-csscomb](https://github.com/bassjobsen/less-plugin-csscomb)
     * [less-plugin-glob](https://github.com/just-boris/less-plugin-glob)
   * [Jade](http://jade-lang.com/)
 * **Оптимизаторы**
   * Синхронизация директорий `app` и `build`
   * Конкатенация JS-файлов
   * Минификация JS- и CSS-файлов
   * Оптимизация изображений
   * Автоматическая вставка содержимого JS- и CSS-файлов из директорий `build/(scripts|styles)`, имя которых содержит суффикс `._inline`, в HTML-файлы
 * **Проверка кода**
   * [JavaScript Hint](http://jshint.com/)
   * [JavaScript Code Style](http://jscs.info/)
   * [CSS Lint](http://csslint.net/)
   * [HTML Hint](http://htmlhint.com/)

## Быстрый старт

 * Загрузите [последний релиз](https://github.com/mrmlnc/raptorius-web-kit/releases) и распакуйте его в необходимую директорию.
 * Запустите терминал, перейдите в директорию с распакованным RWK и выполните команду: `npm i`.

## Версионирование

Raptorius Web Kit придерживается [Semantic Versioning Specification (SemVer)](http://semver.org/lang/ru/).

## Лицензия

Raptorius Web Kit выпускается под [MIT-лицензией](LICENSE).
