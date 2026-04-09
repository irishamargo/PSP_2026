import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

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
                    <div id="main-page" class="d-flex flex-wrap"><div/>
                </div>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "metro.png",
                title: "Безлимитный проезд на метро на 30 дней",
                text: "2500 рублей"
            },
            {
                id: 2,
                src: "mcc.png",
                title: "Метро + МЦК + МЦД на 30 дней",
                text: "3200 рублей"
            },
            {
                id: 3,
                src: "prigorod.png",
                title: "Весь транспорт + зона пригорода на 30 дней",
                text: "4300 рублей"
            },
        ]
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}
