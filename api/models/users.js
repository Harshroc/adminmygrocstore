const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

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
    userCreatedTime: {
        type: Date,
        default: Date.now
    },

});

const usersModel = mongoose.model('Users', usersSchema);

module.exports = usersModel;