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
        type: String,
        required: [true, "Please Enter Product RSP"],
    },
    productCreatedTime: {
        type: Date,
        default: Date.now
    },
    productCategoryId: {
        type: mongoose.productsSchema.Types.ObjectId, ref: 'Categories',
    }

});

const productsModel = mongoose.model('Products', productsSchema);

module.exports = productsModel;