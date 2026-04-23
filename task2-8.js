const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sumOfUnique(arr) {
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
            result += arr[i];
        }
    }

    return result;
}

rl.question('Введите числа через запятую: ', (answer) => {
    const arr = answer.split(',').map(Number);
    console.log('Сумма уникальных элементов:', sumOfUnique(arr));
    rl.close();
});
