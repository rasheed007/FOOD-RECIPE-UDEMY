const Subscriber = require("../models/subscriber"),   /* Require the subscriber module*/
    getSubscriberParams = (body) => {
        return {
            name: body.name,
            email: body.email,
            zipCode: parseInt(body.zipCode)
        };
    };

module.exports = {
    index: (req, res, next) => {
        Subscriber.find()
            .then(subscribers => {
                res.locals.subscribers = subscribers;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscribers: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("subscribers/index");
    },
    new: (req, res) => {
        res.render("subscribers/new");
    },
    create: (req, res, next) => {
        let getSubscriberParams = getSubscriberParams(req.body);
        Subscriber.create(getSubscriberParams)
            .then(subscriber => {
                res.locals.redirect = "/subscribers";
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error saving subscriber: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        var subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error fetching subscriber by ID: ${error.message}`)
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("subscribers/show");
    },
    edit: (req, res, next) => {
        var subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.render("subscribers/edit", {
                    subscriber: subscriber
                });
            })
            .catch(error => {
                console.log(`Error fetching subscriber by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id,
            SubscriberParams = getSubscriberParams(req.body);
        Subscriber.findByIdAndUpdate(subscriberId, {
            $set: SubscriberParams
        })
            .then(subscriber => {
                res.locals.redirect = `/subscribers/${subscriberId}`;
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`Error updating subscriber by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
            .then(() => {
                res.locals.redirect = "/subscribers";
                next();
            })
            .catch(error => {
                console.log(`Error deleting subscriber by ID: ${error.message}`);
                next();
            });
    }
}

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
