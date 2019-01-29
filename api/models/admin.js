const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    penno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    privilege: { type: String },
    firsttime: { type: Boolean, default: true },
});

module.exports = mongoose.model('Admin', AdminSchema);
