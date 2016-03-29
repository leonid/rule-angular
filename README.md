# Пример веб-приложения на AngularJS
===============
Веб-приложение

![Прототип страницы списка ресурсов](./src/assets/images/prototypes/ResourceSearchFrom.jpg)

## Содержание
- [Технологии](#technologies)
- [Возможности](#features)
- [Структура проекта](#folder-structure)
    - [Разработка](#folder-structure-development)
    - [Дистрибутив](#folder-structure-production)
- [Установка и Настройка](#installation-and-configuration)
    - [Platform & Tools](#platform-and-tools)
    - [Установка](#installation)
- [Как запускать](#how-to-run)
    - [Окружение для разработки](#how-to-run-development) 
    - [Тестовое окружение](#how-to-run-test) 
    - [Окружение для рабочей версии](#how-to-run-production) 
- [Тестирование кода](#how-to-test)
    - [Юнит тесты](#how-to-test-unit) 
    - [E2E](#how-to-test-e2e) 
- [Сборка](#how-to-build)
- [Выкатка](#how-to-deploy)
- [Релизы](#how-to-release)

##<a name="technologies"></a>Технологии

* AngularJS, с использованием классов ES6
* [ES7 decorators](https://github.com/wycats/javascript-decorators)
* Unit тесты на ES6, Babel, Karma, Jasmine and Istanbul
* JSON Web Token ([JWT](http://jwt.io)) authentication
* Авторизация пользователей по ролям
* Разработка и сборка проекта с помощью [Webpack](https://webpack.github.io/), [Gulp](http://gulpjs.com/)
* Mocked Backend Workflow - моки для разработки без бекэнда
* Использование идей Angular 2.0 во время разработки на Angular 1.x
* Связывание Rest-ресурсов и моделей ресурсов для оперирования коллекциями ресурсов [Medium](https://medium.com/@tomastrajan/model-pattern-for-angular-js-67494389d6f#.bgm6vy7cr)

##<a name="features"></a>Возможности

* Data driven documents

##<a name="folder-structure"></a>Структура проекта

###<a name="folder-structure-development"></a>Структура исходного кода
    dist/                               --> дистрибутив
    docs/                               --> 
    gulp/                               --> 
    server/                             --> 
    src/                                --> исходный код приложения
      |- app                            --> исходный скрипты приложения
      |  |- common/                     --> 
      |  |  |- config/                  --> настройки angularjs
      |  |  |- constants/               --> константы
      |  |  |- filters/                 --> фильтры
      |  |  |- interceptors/            --> перехватчики
      |  |  |- models/                  --> модели
      |  |  |- providers/               --> провайдеры
      |  |  |- resources/               --> классы rest-запросов ресурсов
      |  |  |- schema/                  --> описание ресурсов в формате json schema
      |  |  |- services/                --> службы
      |  |  |- common.js                --> шрифты
      |  |- components/                 --> компоненты
      |  |- decorators/                 --> декораторы
      |  |- directives/                 --> директивы
      |  |- states/                     --> States, layouts, controllers, state templates
      |  |- app.js                      --> index script
      |- assets                         --> Статика
      |  |- images/                     --> Изображения
      |  |- styles/                     --> Stylus styles
      |- favicon.ico                    --> favicon
      |- index.html                     --> заглавная страница
    test/                               --> 
    .babelrc                            --> 
    .editorconfig                       --> 
    .eslintignore                       --> 
    .eslintrc                           --> настройки
    .gitignore                          --> 
    .jscsrc                             --> 
    CONTRIBUTING.md                     --> правила 
    gulpfile.js                         --> Gulp
    karma.conf.js                       --> тесты
    package.json                        --> 
    protractor.conf.js                  --> 
    README.md                           --> этот документ
    webpack.config.js                   --> Webpack

###<a name="folder-structure-production"></a>Структура дистрибутива
    build/               
      |- dist                       --> исходный код, готовый для выкладки и релиза
      |  |- fonts/                     --> шрифты
      |  |- images/                    --> изображения
      |  |- build-1234567.js           --> собранное, сжатое angular приложение  app js files, html шаблоны, css
      |  |- vendor-1234567.js           --> собранное, сжатое сторонние скрипты
      |  |- index.html                 --> заглавная страница
      |- docs/                      --> документация  

##<a name="installation-and-configuration"></a>Установка и Настройка

###<a name="platform-and-tools"></a>Platform & Tools

###<a name="installation"></a>Установка
    
##<a name="how-to-run"></a>Как запускать

### <a name="how-to-run-development"></a>Окружение для разработки

Запуск сервера разработчика
```
npm run dev
```

###<a name="how-to-run-test"></a>Тестовое окружение

###<a name="how-to-run-production"></a>Окружение дистрибутива
    
##<a name="how-to-test"></a>Тестирование кода

###<a name="how-to-test-unit"></a>Юнит тесты 

###<a name="how-to-test-e2e"></a>E2E

## <a name="how-to-build"></a>Сборка

Запуск сборки проекта
```
npm run build  
```

##<a name="how-to-deploy"></a>Выкатка

## <a name="how-to-release"></a>Релизы
