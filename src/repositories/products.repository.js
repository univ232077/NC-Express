
const path = require('path');
const { isJsonValid } = require('../utils/file.utils');
const fs = require("fs");

const PRODUCTS_FILE = path.resolve(__dirname, "../data/products.json");

async function getAllProducts() {
    return new Promise(((resolve) => {
        fs.readFile(PRODUCTS_FILE, {encoding: "utf-8"}, async (err, buffer) => {
            const data = isJsonValid(buffer) ? JSON.parse(buffer) : [];
            resolve(data);
        })
    }))
}

async function writeToProductsFile(data) {
    return new Promise(((resolve, reject) => {
        fs.writeFile(PRODUCTS_FILE, data, (err) => {
            if (err) reject(err)
            else resolve();
        })
    }))
}

module.exports = {
    getAllProducts,
    writeToProductsFile
}

