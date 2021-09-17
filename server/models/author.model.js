const mongoose = require('mongoose');


const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Author is required!"],
        minlength: [3, "Author name must be at least 2 characters long"]
    }
})

//register the above code at a table in mongodb
const Author = mongoose.model("Author", AuthorSchema )

module.exports = Author;