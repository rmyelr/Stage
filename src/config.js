const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:27017/Test");

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;