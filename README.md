# 5 - Добаление AJAX запросов к API <!-- omit in toc -->

> Лабораторная работа 5 для студентов курса "Проектирование сетевых приложений" 4 семестра кафедры ИУ5 МГТУ им Н.Э. Баумана.

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Начало работы](#начало-работы)
- [Задание](#задание)
- [Указания по выполнению лабораторной работы](#указания-по-выполнению-лабораторной-работы)
    - [Требования к реализации](#требования-к-реализации)
    - [Структура проекта](#структура-проекта)
- [Пример программы](#пример-программы)
- [Результат работы](#результат-работы)

## Цель работы

 Взаимодействие с внешним API через XMLHttpRequest. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого взаимодействия с внешним API, получение данных и вывод их в интерфейс пользователя, и затем выполнить задания по варианту.

---

## Начало работы

Зайдите в свою локальную директорию с репозиторием для выполнения лабораторных работ. Заберите ветку с соответствующей лабораторной работой из общего репозитория:

```sh
git pull upstream
```

**или**

```sh
git pull upstream visual_working_cards
```

Переключитесь на ветку с текущей лабораторной работой:

```sh
git checkout visual_working_cards
```

Свяжите ветку локального репозитория с вашим удаленным репозиторием:

```sh
git push --set-upstream origin visual_working_cards
```

## Задание

Продолжение Лабораторной работы 3: добавить страницу добавления/редактирования и соответствующие кнопки, подключение к созданному API бэкенду. Запросы XHR, Cors обойти через расширение браузера CORS Unblock. Код 4ой лабораторной НЕ НУЖНО добавлять в ветку по 5ой, в 5ой и 6ой остается только фронтенд, как в 3ей

---
## Указания по выполнению лабораторной работы

1. Работа с AJAX — используйте готовый класс `Ajax` из модуля `modules/ajax.js` для выполнения всех HTTP-запросов к серверу.
2. URL-эндпоинты — создайте класс `PlanetUrls` в отдельном файле, где хранятся все URL для обращения к API с базовым адресом `http://localhost:3000`.
3. Отрисовка карточек — удалите статический массив с данными и реализуйте отображение карточек на основе данных, полученных через AJAX-запрос к серверу.

---

## Требования к реализации

1. Добавить поле для ввода числа, ограничивающее количество отображаемых карточек (клиентская пагинация)
2. Все запросы к API выполнять через класс `Ajax` на основе XMLHttpRequest
3. Карточки должны отображаться из данных, полученных с сервера, а не из статичного объекта

---

## Структура проекта

![Фото 1](assets/foto1.png)

---
## Пример программы

Класс Ajax для HTTP-запросов

```javascript
class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }
}
```
Класс stockUrls с эндпоинтами

```javascript
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}
```
---

## Результат работы

![Фото 2](assets/foto2.png)
![Фото 3](assets/foto3.png)
![Фото 4](assets/foto4.png)

---
