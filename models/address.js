const mongoose = require('mongoose');

const usersAddressSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true],
    },
    userAddressType: {
        type: String,
        required: [true],
    },
    userAddress: {
        type: String,
        required: [true],
    },
    userAddressCity: {
        type: String,
        required: [true],
    },
    userAddressPincode: {
        type: Number,
        required: [true],
    },

}, 
{
    timestamps: true
});

const usersAddressModel = mongoose.model('UsersAddress', usersAddressSchema);

module.exports = usersAddressModel;