export class HeaderComponent {
    constructor(parent, onLogoClick) {
        this.parent = parent;
        this.onLogoClick = onLogoClick;
    }

    getHTML() {
        return `
            <div style="
                background-color: white;
                width: 100%;
                height: 70px;
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
            ">
                <span id="logo-link" style="
                    color: rgb(212, 33, 45);
                    font-size: 30px;
                    font-weight: bold;
                    font-family: 'MoscowSans', 'Segoe UI', 'Arial', sans-serif;
                    line-height: 0.8;
                    margin-left: 20px;
                    cursor: pointer;
                ">Московский<br>метрополитен</span>

                <h3 style="margin-left: 120px; font-size: 20px;"> Схема </h3>
                <h3 style="margin-left: 120px; font-size: 20px;"> Как оплатить </h3>
                <h3 style="margin-left: 120px; font-size: 20px;"> Пассажирам </h3>
                <h3 style="margin-left: 120px; font-size: 20px;"> Новости </h3>
                <h3 style="margin-left: 120px; font-size: 20px;"> Контакты </h3>
            </div>
        `;
    }

    addListeners() {
        const logo = document.getElementById('logo-link');
        if (logo && this.onLogoClick) {
            logo.addEventListener('click', this.onLogoClick);
        }
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners();
    }
}
