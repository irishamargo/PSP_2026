import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import { getAllPrices, updatePrice } from "../../global.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div class="container mt-4">
                    <h1 class="mb-4">Выбор абонемента на транспорт</h1>
                    <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
                </div>
            `
        )
    }

    async getData() {
        try {
            const response = await fetch('http://localhost:3000/stocks');
            const stocks = await response.json();
            console.log('Тип данных:', typeof stocks);
            console.log('Данные:', stocks);
            return stocks;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            return [];
        }
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    updateProductPrice(productId, newPrice) {
        const card = document.querySelector(`#click-card-${productId}`)?.closest('.card');
        if (card) {
            const priceElement = card.querySelector('.card-text');
            if (priceElement) {
                priceElement.textContent = newPrice;
            }
        }
    }

    async render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        window.addEventListener('priceUpdated', (event) => {
            const { productId, newPrice } = event.detail;
            this.updateProductPrice(productId, newPrice);
        });

        const data = await this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}
