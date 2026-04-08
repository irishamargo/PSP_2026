const themeBtn = document.getElementById('theme-toggle');
const MAX_DISPLAY_LENGTH = 15;  // Максимальное количество символов

if (themeBtn) {
    themeBtn.onclick = () => {
        // Получаем текущую тему
        const currentTheme = document.documentElement.getAttribute('data-theme');

        // Переключаем тему
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.textContent = 'Темная тема';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.textContent = 'Светлая тема';
        }
    };
}

window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    const outputElement = document.getElementById("result")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            if (a.length >= MAX_DISPLAY_LENGTH) {
                return;
            }
            if (digit === '.' && a === '') {
                a = '0.'
            }
            else if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        }
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if (b.length >= MAX_DISPLAY_LENGTH) {
                return;
            }
            if (digit === '.' && b === '') {
                b = '0.';
                outputElement.innerHTML = b;
            }
            else if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
            }
            outputElement.innerHTML = b;
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) * -1).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) * -1).toString();
                outputElement.innerHTML = b;
            }
        }
    }

    // Кнопка процента (%)
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b) / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    }

    //Кнопка возведения в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a)**2).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b)**2).toString();
                outputElement.innerHTML = b;
            }
        }
    }

    //Кнопка корня
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (parseFloat(a)**0.5).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (parseFloat(b)**0.5).toString();
                outputElement.innerHTML = b;
            }
        }
    }

    //Кнопка стирания одного символа
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = a.slice(0, -1);
                if (a === '') {
                    outputElement.innerHTML = 0;
                } else {
                    outputElement.innerHTML = a;
                }
            }
        } else {
            if (b !== '') {
                b = b.slice(0, -1);
                if (b === '') {
                    outputElement.innerHTML = 0;
                } else {
                    outputElement.innerHTML = b;
                }
            }
        }
    }

    // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_equal").onclick = function() {
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }

        if ((expressionResult.toString()).length >= MAX_DISPLAY_LENGTH) {
            expressionResult = expressionResult.toExponential(10);
        }
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};
