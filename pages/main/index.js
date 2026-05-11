import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import { getAllPrices, updatePrice } from "../../global.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

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
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="mb-0">Выбор абонемента на транспорт</h1>

                    <div class="d-flex gap-2" style="margin-right: auto; margin-left: 20px;">
                        <input type="text" id="searchInput" class="form-control" placeholder="Поиск..." style="width: 200px;">
                        <button id="searchBtn" class="btn btn-outline-primary">Найти</button>
                    </div>

                    <button id="showAddFormBtn" class="btn btn-success">+ Добавить карточку</button>
                </div>

                <div id="addForm" style="display: none; background: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>Новая карточка</h3>
                    <div class="mb-2">
                        <input type="text" id="newSrc" class="form-control" placeholder="Путь к изображению (например: new_model.png)">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="newTitle" class="form-control" placeholder="Название абонемента">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="newText" class="form-control" placeholder="Цена (например: 2500 рублей)">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="newPeriod" class="form-control" placeholder="Период">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="newDescription" class="form-control" placeholder="Описание">
                    </div>
                    <button id="cancelAddBtn" class="btn btn-secondary">Отмена</button>
                </div>

                <div id="editForm" style="display: none; background: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>Редактировать карточку</h3>
                    <input type="hidden" id="editId">
                    <div class="mb-2">
                        <input type="text" id="editSrc" class="form-control" placeholder="Путь к изображению/модели">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="editTitle" class="form-control" placeholder="Название абонемента">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="editText" class="form-control" placeholder="Цена">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="editPeriod" class="form-control" placeholder="Период">
                    </div>
                    <div class="mb-2">
                        <input type="text" id="editDescription" class="form-control" placeholder="Описание">
                    </div>
                    <button id="cancelEditBtn" class="btn btn-secondary">Отмена</button>
                </div>

                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
        `
        )
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    showEditForm(id) {
        ajax.get(stockUrls.getStockById(id), (data) => {
            if (data) {
                document.getElementById('editId').value = data.id;
                document.getElementById('editSrc').value = data.src;
                document.getElementById('editTitle').value = data.title;
                document.getElementById('editText').value = data.text;
                document.getElementById('editPeriod').value = data.period;
                document.getElementById('editDescription').value = data.description;
                document.getElementById('editForm').style.display = 'block';
                document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    cancelEdit() {
        document.getElementById('editForm').style.display = 'none';
        document.getElementById('editId').value = '';
        document.getElementById('editSrc').value = '';
        document.getElementById('editTitle').value = '';
        document.getElementById('editText').value = '';
        document.getElementById('editPeriod').value = '';
        document.getElementById('editDescription').value = '';
    }

    deleteStock(id) {
        if (confirm(`Удалить карточку с ID ${id}?`)) {
            ajax.delete(stockUrls.removeStockById(id), (data, status) => {
                if (status === 204) {
                    alert('Карточка удалена!');
                    this.getData();
                } else {
                    alert('Ошибка при удалении карточки');
                }
            });
        }
    }

    searchCards() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        if (searchTerm === '') {
            this.getData();
            return;
        }

        ajax.get(stockUrls.getStocks(), (data) => {
            const filtered = data.filter(item =>
                item.title.toLowerCase().includes(searchTerm)
            );
            this.renderData(filtered);
        });
    }

    renderData(items) {
        this.pageRoot.innerHTML = '';

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this), this.showEditForm.bind(this), this.deleteStock.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const showBtn = document.getElementById('showAddFormBtn');
        if (showBtn) {
            showBtn.onclick = () => {
                const form = document.getElementById('addForm');
                form.style.display = form.style.display === 'none' ? 'block' : 'none';
            };
        }

        const cancelBtn = document.getElementById('cancelAddBtn');
        if (cancelBtn) {
            cancelBtn.onclick = () => {
                document.getElementById('addForm').style.display = 'none';
                document.getElementById('newSrc').value = '';
                document.getElementById('newTitle').value = '';
                document.getElementById('newText').value = '';
            };
        }

        const cancelEditBtn = document.getElementById('cancelEditBtn');
        if (cancelEditBtn) {
            cancelEditBtn.onclick = () => this.cancelEdit();
        }

        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.onclick = () => this.searchCards();
        }

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchCards();
            });
        }

        this.getData();
    }
}
