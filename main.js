const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const homeController = require('./controllers/homeController')

// Set EJS as the view engine
app.set("view engine", "ejs");

// Use express-ejs-layouts
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    const title = 'Home Page';
    const body = 'Welcome to the home page of Recipe Cuisine!';    
    res.render("home", { title, body }); 
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);


app.listen(app.get("port"), () => {
    console.log(
        `Server running at http://localhost:${app.get(
            "port"
        )}`
    )
})