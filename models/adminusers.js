const mongoose = require('mongoose');

const adminUsersSchema = new mongoose.Schema({

    userEmail: {
        type: String,
        required: [true, "Please enter an email id"],
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    userMobile: {
        type: String,
        required: [true, "Please enter mobile number"]
    },
    userPassword:{
        type: String,
        required : [true, "Please enter password"]
    },

}, 
{
    timestamps: true
}
);

const adminUsersModel = mongoose.model('AdminUsers', adminUsersSchema);

module.exports = adminUsersModel;