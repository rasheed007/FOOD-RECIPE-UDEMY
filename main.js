const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const homeController = require('./controllers/homeController');
const errorController = require("./controllers/errorController");
const Subscriber = require('./models/subscriber');
const subscribersController = require("./controllers/subscriberController");
const userController = require("./controllers/usersController");
const usersController = require("./controllers/usersController");
const router = express.Router();
const methodOverride = require("method-override");
const user = require("./models/user");
const expressSession = require("express-session"),
cookieParser = require("cookie-parser"),
connectFlash = require("connect-flash");
const expressValidator = require("express-validator");


// Set EJS as the view engine
app.set("view engine", "ejs");

// Use express-ejs-layouts
app.use(expressLayouts);

express.json()
express.urlencoded()
router.use(expressValidator())

app.use(express.static(__dirname + '/public'));

app.use("/", router);
router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));
router.use(connectFlash());
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    const title = 'Home Page';
    const body = 'Welcome to the home page of Recipe Cuisine!';    
    res.render("home", { title, body }); 
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// app.get("/subscribers", subscribersController.getAllSubscribers)
// app.get("/contact", subscribersController.getSubscriptionPage);
// app.post("/subscribe", subscribersController.saveSubscriber);

app.get("/users", usersController.index, usersController.indexView);

router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate, usersController.redirectView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", userController.update, usersController.redirectView);
router.delete("/users/:id/delete", userController.delete, usersController.redirectView)


router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit)
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

app.listen(app.get("port"), () => {
    console.log(
        `Server running at http://localhost:${app.get(
            "port"
        )}`
    )
})