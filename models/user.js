const bcrypt = require("bcrypt");

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

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
    .catch(error => {
        console.log(`Error in hashing password: ${error.message}`);
        next(error);
    });    
});

userSchema.methods.passwordComparison = function(inputPasssword){
    let user = this;
    return bcrypt.compare(inputPassword, user.password)
};

// userSchema.virtual("fullName").get(function() {
//     return `${this.name.first} ${this.name.last}`;
// });
// module.exports = mongoose.model("User", userSchema);