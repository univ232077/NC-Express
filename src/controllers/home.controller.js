const {Router} = require("express");
const {getAllProducts} = require("../repositories/products.repository");

const router = Router();

router.get("/", async (req, res) => {
    const productCards = await getAllProducts();
    res.render("pages/home", {productCards});
})

router.get("/home", async (req, res) => {
    res.redirect("/");
})

module.exports = router;
