const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function flatten(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            const flattened = flatten(arr[i]);
            result = result.concat(flattened);
        } else {
            result.push(arr[i]);
        }
    }

    return result;
}

rl.question('Введите массив: ', (answer) => {
    try {
        let input = answer.trim();
        const arr = eval(input);
        console.log('Развёрнутый массив:', flatten(arr));
    } catch (error) {
        console.log('Ошибка! Введите массив в правильном формате, например: [1,2,[3,4]]');
    }
    rl.close();
});
