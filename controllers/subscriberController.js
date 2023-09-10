const Subscriber = require("../models/subscriber"); /* Require the subscriber module*/

exports.getAllSubscribers = (req, res, next) => {    /* exports getAllSubscribers to pass data from the database to the next middleware function*/
    Subscriber.find({})
    .exec()
    .then((subscribers) => {
        res.render("subscribers", {
            subscribers: subscribers
        });
    })
    .catch((error) => {
        console.log(error.message);
        return[];
    })
    .then(() => {
        console.log("promise complete")
    });
};

exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save((error, result) => {
        if (error) res.send(error);
        res.render("thanks")
    });
};
