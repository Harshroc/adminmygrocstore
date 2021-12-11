const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Please Enter Product Name"],
    },
    productDesc: {
        type: String,
        required: [true, "Please Enter Product Desciption"],
    },
    productImage: {
        type: String,
        required: [true, "Uploaded file must have a name"]
    },
    productMrp: {
        type: Number,
        required: [true, "Please Enter Product MRP"],
    },
    productRsp: {
        type: Number,
        required: [true, "Please Enter Product RSP"],
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: [true],
    },
    productCreatedTime: {
        type: Date,
        default: Date.now
    },
    

});

const productsModel = mongoose.model('Products', productsSchema);

module.exports = productsModel;