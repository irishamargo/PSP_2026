import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        const abonement = {
            1: {
                id: 1,
                src: "metro.png",
                title: `Безлимитный проезд на метро на 30 дней`,
                text: "Данный абонемент позволяет совершать неограниченное число поездок на метро по всей Москве в течении месяца, всего за 2500 рублей"
            },
            2: {
                id: 2,
                src: "mcc.png",
                title: `Метро + МЦК + МЦД на 30 дней`,
                text: "Данный абонемент позволяет совершать неограниченное число поездок на метро, мцк и мцд в пределах Москвы, делать пересадки между всеми этими видами транспорта в течении месяца, всего за 3200 рублей"
            },
            3: {
                id: 3,
                src: "prigorod.png",
                title: `Весь транспорт + зона пригорода на 30 дней`,
                text: "Данный абонемент позволяет совершать неограниченное число поездок на метро, мцк и мцд в пределах Москвы и Московской области, делать пересадки между всеми этими видами транспорта в течении месяца, всего за 4300 рублей"
            }
        };
        return abonement[this.id];
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const product = new ProductComponent(this.pageRoot)
        product.render(data)
    }
}
