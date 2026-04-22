window.transportPrices = window.transportPrices || {
    1: "2500 рублей",
    2: "3200 рублей",
    3: "4300 рублей"
};

export function updatePrice(productId, newPrice) {
    window.transportPrices[productId] = newPrice;

    window.dispatchEvent(new CustomEvent('priceUpdated', {
        detail: { productId, newPrice }
    }));
}

export function getPrice(productId) {
    return window.transportPrices[productId];
}

export function getAllPrices() {
    return { ...window.transportPrices };
}
