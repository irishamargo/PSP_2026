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
                    <button id="submitAddBtn" class="btn btn-primary">Сохранить</button>
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
                    <button id="submitEditBtn" class="btn btn-primary">Сохранить</button>
                    <button id="cancelEditBtn" class="btn btn-secondary">Отмена</button>
                </div>

                <div id="main-page" class="d-flex flex-wrap justify-content-start"></div>
            </div>
        `
        )
    }

    async getData() {
        try {
            const response = await fetch('http://localhost:3000/stocks');
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    async addNewStock() {
        const src = document.getElementById('newSrc').value;
        const title = document.getElementById('newTitle').value;
        const text = document.getElementById('newText').value;
        const period = document.getElementById('newPeriod').value;
        const description = document.getElementById('newDescription').value;

        if (!src || !title || !text) {
            alert('Заполните обязательные поля (src, title, text)!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/stocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ src, title, text, period, description })
            });

            if (response.ok) {
                alert('Карточка добавлена!');
                document.getElementById('addForm').style.display = 'none';
                document.getElementById('newSrc').value = '';
                document.getElementById('newTitle').value = '';
                document.getElementById('newText').value = '';
                document.getElementById('newPeriod').value = '';
                document.getElementById('newDescription').value = '';
                this.getData();
            } else {
                alert('Ошибка при добавлении карточки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось добавить карточку');
        }
    }

    async showEditForm(id) {
        try {
            const response = await fetch(`http://localhost:3000/stocks/${id}`);
            const data = await response.json();

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
        } catch (error) {
            console.error('Ошибка загрузки карточки для редактирования:', error);
        }
    }

    async saveEdit() {
        const id = parseInt(document.getElementById('editId').value);
        const src = document.getElementById('editSrc').value;
        const title = document.getElementById('editTitle').value;
        const text = document.getElementById('editText').value;
        const period = document.getElementById('editPeriod').value;
        const description = document.getElementById('editDescription').value;

        if (!src || !title || !text) {
            alert('Заполните обязательные поля (src, title, text)!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/stocks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ src, title, text, period, description })
            });

            if (response.ok) {
                alert('Карточка обновлена!');
                document.getElementById('editForm').style.display = 'none';
                this.getData();  // Перезагружаем список
            } else {
                alert('Ошибка при обновлении карточки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось обновить карточку');
        }
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

    async deleteStock(id) {
        if (confirm('Удалить карточку?')) {
            try {
                const response = await fetch(`http://localhost:3000/stocks/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Удалено!');
                    this.getData();
                }
            } catch (error) {
                console.error('Ошибка удаления:', error);
            }
        }
    }

    async searchCards() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        if (searchTerm === '') {
            this.getData();
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/stocks');
            const data = await response.json();

            const filtered = data.filter(item =>
                item.title.toLowerCase().includes(searchTerm)
            );
            this.renderData(filtered);
        } catch (error) {
            console.error('Ошибка поиска:', error);
        }
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

        const submitAddBtn = document.getElementById('submitAddBtn');
        if (submitAddBtn) {
            submitAddBtn.onclick = () => this.addNewStock();
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

        const submitEditBtn = document.getElementById('submitEditBtn');
        if (submitEditBtn) {
            submitEditBtn.onclick = () => this.saveEdit();
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
