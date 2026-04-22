export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px; margin: 0 auto; overflow: hidden; border: none;">
                    <div class="row g-0">
                        <div style="width: 100%; height: 300px; overflow: hidden; border-radius: 10px;">
                            <img src="${data.src}" class="img-fluid" alt="картинка" style="object-fit: cover; display: block;">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" style="font-weight: bold; font-size: 18px;">${data.title}</h5>
                        </div>

                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
