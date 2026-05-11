export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 400px; margin: 10px; overflow: hidden; border-radius: 10px;">
                    <img class="card-img-top" src="${data.src}" alt="${data.title}" style="height: 300px; object-fit: cover; display: block;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5);"></div>
                    <div class="card-body" style="position: absolute; bottom: 0; color: white;">
                        <h5 class="card-title" style="font-weight: bold; font-size: 18px;">${data.title}</h5>
                        <p class="card-text" style="font-size: 14px;">${data.text}</p>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Узнать подробности</button>
                        <button class="btn btn-primary" id="edit-card-${data.id}" data-id="${data.id}">Редактировать</button>
                        <div style="margin-top: 10px;">
                            <button class="btn btn-danger" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                        </div>
                    </div>
                    </div>
                </div>
            `
        )
    }

    addListeners(data, clickListener, editListener, deleteListener) {
        const detailBtn = document.getElementById(`click-card-${data.id}`);
        if (detailBtn) {
            detailBtn.addEventListener("click", clickListener);
        }

        const editBtn = document.getElementById(`edit-card-${data.id}`);
        if (editBtn) {
            editBtn.addEventListener("click", () => editListener(data.id));
        }

        const deleteBtn = document.getElementById(`delete-card-${data.id}`);
        if (deleteBtn && deleteListener) {
            deleteBtn.addEventListener("click", () => deleteListener(data.id));
        }
    }

    render(data, listener, editListener, deleteListener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener, editListener, deleteListener)
    }
}
