const mongoose = require('mongoose');

const random = Math.random().toString(26).slice(2);

const usersOrdersSchema = new mongoose.Schema({
    
    userOrderId: {
        type: String,
        default: random,
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
        _id:  mongoose.Schema.Types.ObjectId,
        title: String,
        count: Number,
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
    orderContactNumber: {
        type: Number,
        required: [true],
    },
},
{
    timestamps: true
}
);

const usersOrdersModel = mongoose.model('usersOrders', usersOrdersSchema);

module.exports = usersOrdersModel;