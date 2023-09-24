const mongoose = require("mongoose"),
{Schema} = mongoose,
Subscriber = require("./subscriber");
userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    password: {
        type: String,
        required: true
    },
    courses: [{type: Schema.Types.ObjectId, ref: "Course"}],
    subscribedAccount: {type: Schema.Types.ObjectId, ref: "Subscriber"}, 
    timestamps: true
});

userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount === undefined) { /** Add a quick conditional check for existing subscriber connections */
        Subscriber.findOne({
            email: user.email    /** Query for a single subscriber */
        })
        .then(subscriber => {
            user.subscribedAccount = subscriber;
            next();
        })
        .catch(error => {
            console.log(`Error in connecting subscriber: ${error.message}`);
            next(error); 
        });
    } else {
        next(); /* Call next function if user already has an association */
    }
});
userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);