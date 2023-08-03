const express = require("express");
const path = require("path");
// const csrf = require("csurf");
const eSession = require("express-session")

const createSessionConfig = require("./config/session");
const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRouter = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");
const middlewares = require("./middlewares/app-middlewares");

const app = express();

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const session = createSessionConfig();

app.use(eSession(session));
// app.use(csrf());

app.use(function(req, res, next){
    res.locals.csrfToken = req.csrfToken;
    next();
})
app.use(middlewares.initializeCart);
app.use(middlewares.updateCartPrices);
app.use(middlewares.checkAuthStatus);

app.use(baseRouter);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", middlewares.protectRoutes, ordersRoutes);
app.use("/admin", middlewares.protectRoutes, adminRoutes);

app.use(function(req, res){
    res.status(404).render("shared/404");
});

app.use(function(error, req, res, next){
    console.log(error);

    if(error.code === 404){
        return res.status(404).render("shared/404");
    }

    res.status(500).render("shared/500");
});

db.connectToDB().then( function(){
    app.listen(3000);
}).catch( function(error) {
    console.log("Failed to connect to the database!");
    console.log(error);
});