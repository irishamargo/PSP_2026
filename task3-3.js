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

console.log(flatten([1, 2, 3, [4, 5, 6, [10, 20, 30], 7]]));
