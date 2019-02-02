const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    penno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    currentStation: {
        type: ObjectId,
        ref: 'Station',
    },
    prevStation: {
        first: {
            type: ObjectId,
            ref: 'Station',
        },
        second: {
            type: ObjectId,
            ref: 'Station',
        },
        Third: {
            type: ObjectId,
            ref: 'Station',
        },
    },
    lastTransferDate: Date,
    joinDate: Date,
    reqTransfer: {
        op1: {
            type: ObjectId,
            ref: 'Station',
        },
        op2: {
            type: ObjectId,
            ref: 'Station',
        },
        op3: {
            type: ObjectId,
            ref: 'Station',
        },
    },
    genTransfer: {
        op1: {
            type: ObjectId,
            ref: 'Station',
        },
        op2: {
            type: ObjectId,
            ref: 'Station',
        },
        op3: {
            type: ObjectId,
            ref: 'Station',
        },
    },
    submitDate: Date,
    firsttime: { type: Boolean, default: true },
    allotedStation: String,
});

module.exports = mongoose.model('User', UserSchema);
