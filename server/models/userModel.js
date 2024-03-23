const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxLength: 50,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        currency: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
