# 3 - Простое веб-приложение. Верстка <!-- omit in toc -->

> Лабораторная работа 3 для студентов курса "Проектирование сетевых приложений" 4 семестра кафедры ИУ5 МГТУ им Н.Э. Баумана.

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Начало работы](#начало-работы)
- [Задание](#задание)
- [Указания по выполнению лабораторной работы](#указания-по-выполнению-лабораторной-работы)
	- [Общие советы](#общие-советы)
    - [Структура проекта](#структура-проекта)
	- [Требования к реализации](#требования-к-реализации)
- [Пример программы](#пример-программы)
- [Результат работы](#результат-работы)

## Цель работы

Цель данной лабораторной работы:

- Знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту

---

## Начало работы

Зайдите в свою локальную директорию с репозиторием для выполнения лабораторных работ. Заберите ветку с соответствующей лабораторной работой из общего репозитория:

```sh
git pull upstream
```

**или**

```sh
git pull upstream web-application-metro
```

Переключитесь на ветку с текущей лабораторной работой:

```sh
git checkout web-application-metro
```

Свяжите ветку локального репозитория с вашим удаленным репозиторием:

```sh
git push --set-upstream origin web-application-metro
```

## Задание

1. Создать двухстраничное приложение из примера по вариантам
2. Вариант состоит из темы и компонента, который необходимо использовать
3. Все данные должны соответствовать выбранной теме
4. Компонент можно применить по своему усмотрению

---
## Указания по выполнению лабораторной работы

### Общие советы

- Проект должен быть инициализирован через npm init
- Установлена библиотека Bootstrap (npm i bootstrap)
- Структура проекта должна включать папки pages/ и components/
- Главная страница (MainPage) должна отображать список карточек (3-4 шт.) с изображениями, заголовками и описаниями
- При клике на карточку должна открываться страница продукта (ProductPage) с детальной информацией
- На странице продукта должна быть кнопка «Назад» для возврата на главную страницу
- Должен быть реализован дополнительный компонент

---

### Структура проекта

![Фото 1](assets/foto1.png)

---

### Требования к реализации

- Код должен быть написан на JavaScript (ES6+) с использованием модулей (import / export)
- Проект должен быть инициализирован через npm init
- Установлен и подключен Bootstrap через npm
- Страницы должны быть реализованы в виде классов (MainPage, ProductPage)
- Компоненты должны быть переиспользуемыми и храниться в папке components/
- Данные для карточек должны быть вынесены в отдельный массив в методе getData()
- При переходе между страницами должен перерисовываться только контейнер #root
- Поддержка открытия страницы продукта по ID карточки

---

## Пример программы

Главная страница

```javascript
export class MainPage {
    getData() {
        return [
            { id: 1, src: "metro.png", title: "Безлимитный проезд на метро", text: "2500 рублей" },
            { id: 2, src: "mcc.png", title: "Метро + МЦК + МЦД", text: "3200 рублей" },
            { id: 3, src: "prigorod.png", title: "Весь транспорт + пригород", text: "4300 рублей" }
        ];
    }

    clickCard(e) {
        const productPage = new ProductPage(this.parent, e.target.dataset.id);
        productPage.render();
    }

    render() {
        const data = this.getData();
        data.forEach(item => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }
}
```

Страница товара
```javascript
export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        return {
            1: {
                src: "metro.png",
                title: "Безлимитный проезд на метро",
                text: "Неограниченное число поездок на метро",
                period: "30 дней",
                cost: getPrice(1)
            },
            2: {
                src: "mcc.png",
                title: "Метро + МЦК + МЦД",
                text: "Поездки на метро, МЦК и МЦД",
                period: "30 дней",
                cost: getPrice(2)
            },
            3: {
                src: "prigorod.png",
                title: "Весь транспорт + пригород",
                text: "Поездки по Москве и области",
                period: "30 дней",
                cost: getPrice(3)
            }
        }[this.id];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    changePrice(newPrice) {
        updatePrice(this.id, newPrice);
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(data, (newPrice) => this.changePrice(newPrice));
    }
}
```

Компонент карточки
```javascript
export class ProductCardComponent {
    getHTML(data) {
        return `
            <div class="card" style="width: 400px;">
                <img src="${data.src}" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5>${data.title}</h5>
                    <p>${data.text}</p>
                    <button id="click-card-${data.id}" data-id="${data.id}">Узнать подробности</button>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }
}
```

---

## Результат работы

![Фото 2](assets/foto2.png)
![Фото 3](assets/foto3.png)

---
