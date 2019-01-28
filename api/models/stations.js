const mongoose = require('mongoose');

const StationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statCode: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    a1: { type: Number, min: 0 },
    a2: { type: Number, min: 0 },
    a3: { type: Number, min: 0 },
    a4: { type: Number, min: 0 },
});

module.exports = mongoose.model('Station', StationSchema);
