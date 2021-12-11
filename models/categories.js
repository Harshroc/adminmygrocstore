const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({

    categoryName: {
        type: String,
        required: [true, "Please Enter Category Name"],
    },
    categoryDesc: {
        type: String,
        required: [true, "Please Enter Category Desciption"],
    },
    categoryImage: {
        type: String,
        required: [true, "Uploaded file must have a name"]
    }

});

const categoriesModel = mongoose.model('Categories', categoriesSchema);

module.exports = categoriesModel;