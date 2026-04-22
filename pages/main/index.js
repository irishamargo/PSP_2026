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
                    <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
                </div>
            `
        )
    }

    getData() {
        const prices = getAllPrices();
        return [
            {
                id: 1,
                src: "metro.png",
                title: "Безлимитный проезд на метро на 30 дней",
                text: prices[1]
            },
            {
                id: 2,
                src: "mcc.png",
                title: "Метро + МЦК + МЦД на 30 дней",
                text: prices[2]
            },
            {
                id: 3,
                src: "prigorod.png",
                title: "Весь транспорт + зона пригорода на 30 дней",
                text: prices[3]
            },
        ]
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

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        window.addEventListener('priceUpdated', (event) => {
            const { productId, newPrice } = event.detail;
            this.updateProductPrice(productId, newPrice);
        });

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}
