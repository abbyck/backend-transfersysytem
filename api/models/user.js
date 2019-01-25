const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    penno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: Number, required: true },
    prevStation: {
        first: String,
        second: String,
        Third: String,
    },
    lastTransferDate: Date,
    reqTransfer: {
        op1: String,
        op2: String,
        op3: String,
    },
    genTransfer: {
        op1: String,
        op2: String,
        op3: String,
    },
    firsttime: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', UserSchema);
