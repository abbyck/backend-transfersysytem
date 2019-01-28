const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    penno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    currentStation: Number,
    prevStation: {
        first: Number,
        second: Number,
        Third: Number,
    },
    lastTransferDate: Date,
    joinDate: Date,
    reqTransfer: {
        op1: Number,
        op2: Number,
        op3: Number,
    },
    genTransfer: {
        op1: Number,
        op2: Number,
        op3: Number,
    },
    firsttime: { type: Boolean, default: true },
    allotedStation: String,
});

module.exports = mongoose.model('User', UserSchema);
