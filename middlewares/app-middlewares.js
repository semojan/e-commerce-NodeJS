const Cart = require("../models/cart.model");

function checkAuthStatus (req, res, next){
    const uid = req.session.uid;

    if (!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    res.locals.isAdmin = req.session.isAdmin;
    next();
}

function protectRoutes (req, res, next){
    if (!res.locals.isAuth){
        res.redirect("/401");
    }

    if (req.path.startsWith("/admin") && !res.locals.isAdmin){
        res.redirect("/403");
    }

    next()
}

function initializeCart(req, res, next) {
    let cart;

    if (!req.session.cart){
        cart = new Cart();
    } else {
        const sessionCart = req.session.cart;
        cart = new Cart(
            req.session.cart.items, 
            sessionCart.totalQuantity, 
            sessionCart.totalPrice
            );
    }

    res.locals.cart = cart;

    next();
}

async function updateCartPrices(req, res, next) {
    const cart = res.locals.cart;
  
    await cart.updatePrices();
  
    // req.session.cart = cart;
    next();
}

module.exports = {
    checkAuthStatus: checkAuthStatus,
    protectRoutes: protectRoutes,
    initializeCart: initializeCart,
    updateCartPrices: updateCartPrices
};