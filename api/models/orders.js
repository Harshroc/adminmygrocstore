const mongoose = require('mongoose');

const usersOrdersSchema = new mongoose.Schema({
    
    userOrderId: {
        type: String,
        default: shortid.generate,
    },
    orderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true],
    },
    orderAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersAddress',
        required: [true],
    },
    orderProducts: [{
        _id: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        title: String,
        count: Number,
        required: [true],
    }],
    orderAmount: {
        type: Number,
        required: [true],
    },
    orderStatus: {
        type: String,
        required: [true],
        default: 'pending'
    },
    orderDeliveryTime: {
        type: String,
        required: [true],
    },
    orderPaymentMethod: {
        type: String,
        required: [true],
    },

},
{
    timestamps: true
}
);

const usersOrdersModel = mongoose.model('usersOrders', usersOrdersSchema);

module.exports = usersOrdersModel;