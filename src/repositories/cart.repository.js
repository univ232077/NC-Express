
const path = require('path');
const { isJsonValid } = require('../utils/file.utils');
const fs = require("fs");

const CART_FILE = path.resolve(__dirname, "../data/cart.json");

function CartProduct(productID, amount) {
    this.productID = productID;
    this.amount = amount;
}

async function getCartProducts() {
    return new Promise(((resolve) => {
        fs.readFile(CART_FILE, {encoding: "utf-8"}, async (err, buffer) => {
            const data = isJsonValid(buffer) ? JSON.parse(buffer) : [];
            resolve(data);
        })
    }))
}

async function writeToCart(data) {
    return new Promise(((resolve, reject) => {
        fs.writeFile(CART_FILE, data, (err) => {
            if (err) reject(err)
            else resolve();
        })
    }))
}


module.exports = {
    writeToCart,
    getCartProducts,
    CartProduct
}
