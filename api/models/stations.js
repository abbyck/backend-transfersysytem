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
    si: { type: Number, min: 0 },
    asi: { type: Number, min: 0 },
    scpo: { type: Number, min: 0 },
    tscpo: { type: Number, min: 0 },
    cpo: { type: Number, min: 0 },
    wcpo: { type: Number, min: 0 },
});

module.exports = mongoose.model('Station', StationSchema);
