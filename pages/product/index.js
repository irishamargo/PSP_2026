import {ProductComponent} from "../../components/product/index.js";
//import {BackButtonComponent} from "../../components/back-button/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import {MainPage} from "../main/index.js";
import { getPrice, updatePrice } from "../../global.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    async getData() {
        try {
            const response = await fetch(`http://localhost:3000/stocks/${this.id}`);
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
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

    // clickBack() {
    //     const mainPage = new MainPage(this.parent)
    //     mainPage.render()
    // }

    changePrice(newPrice) {
        updatePrice(this.id, newPrice);
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);

        const accordion = new AccordionComponent(this.pageRoot);

        const accordionData = {
            text: item.description || 'Нет описания',
            period: item.period || '30 дней',
            cost: item.text || 'Цена не указана'
        };

        accordion.render(accordionData);
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        //const backButton = new BackButtonComponent(this.pageRoot)
        //backButton.render(this.clickBack.bind(this))

        this.getData();
    }
}
