
const { Router } = require("express");
const { getAllProducts } = require('../repositories/products.repository');
const { getCartProducts, CartProduct, writeToCart } = require('../repositories/cart.repository');

const router = Router();

router.get("/", async (req, res) => {
    const allProducts = await getAllProducts();
    const cartProducts = await getCartProducts();
    const cartIDs = cartProducts.map((item) => { return item.productID; });

    const cartItems = [];
    allProducts.forEach((generalProduct) => {
        if (cartIDs.includes(generalProduct.productID)) {
            const index = cartIDs.indexOf(generalProduct.productID);
            const amount = cartProducts[index].amount;
            cartItems.push({
                productID: generalProduct.productID,
                price: generalProduct.price * amount,
                name: generalProduct.name,
                amount: amount
            })
        }
    })
    res.render("pages/cart", {cartItems});
})

router.post("/add/:id", async (req, res) => {
    const allProducts = await getAllProducts();
    const allProductIDs = allProducts.map((card) => { return card.productID });
    const productID = req.params.id;
    if (!allProductIDs.includes(+productID)) {
        res.status(404);
        res.send("Product not found");
    } else {
        const cartProducts = await getCartProducts();
        const cartIDs = cartProducts.map((product) => { return (product.productID).toString(); });
        if (cartIDs.includes(productID)) {
            const index = cartIDs.indexOf(productID);
            cartProducts[index].amount += 1;
        } else {
            cartProducts.push(new CartProduct(+productID, 1));
        }
        await writeToCart(JSON.stringify(cartProducts));
        res.redirect("/");
    }
})

router.post("/delete/:id", async (req, res) => {
    const cartProducts = await getCartProducts();
    const removeID = req.params.id;
    cartProducts.forEach((product, index) => {
        if (product.productID === +removeID)
            cartProducts.splice(index, 1);
    })
    await writeToCart(JSON.stringify(cartProducts));
    res.status(200);
    res.redirect("/cart");
})

module.exports = router;

