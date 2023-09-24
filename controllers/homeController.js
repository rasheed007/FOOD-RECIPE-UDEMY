var courses = [
    {
        title: "Asun peppered Cakes",
        cost: 500
    },
    {
        title: "Goatmeat roasted vegetables",
        cost: 750
    },
    {
        title: "Jambalaya spicy Rice",
        cost: 400
    }
];

module.exports = {
    showCourses: (req, res) => {
        res.render("courses", {
            offeredCourses: courses
        });
    }
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};