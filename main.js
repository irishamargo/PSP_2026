import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {MainPage} from "./pages/main/index.js";
import { HeaderComponent } from "./components/header/index.js";

const headerContainer = document.getElementById('header-container');
const contentContainer = document.getElementById('content-container');

function goToMainPage() {
    const mainPage = new MainPage(contentContainer);
    mainPage.render();
}

const mainPage = new MainPage(contentContainer);
mainPage.render();

const header = new HeaderComponent(headerContainer, goToMainPage);
header.render();
