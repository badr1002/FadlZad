const mongoose = require('mongoose');
const activationCodeSchema = mongoose.Schema({
    code: {
        type: String, trim: true, required: true, unique: true
    },
    email: {
        type: String, trim: true, required: true, unique: true
    },
    creationDate: { type: String }
})

const activationCode = mongoose.model('ActivationCode', activationCodeSchema,"ActivationCode");
module.exports = activationCode;