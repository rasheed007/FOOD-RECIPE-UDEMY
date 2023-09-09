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
exports.showCourses = (req, res) => {
    const body = courses;
    res.render("courses", {
        offeredCourses: courses, body
    });
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};
exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};