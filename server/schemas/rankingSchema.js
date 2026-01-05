const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    },
    bathroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bathroom', 
        required: true,
    },
    cleanliness: {
        type: Number,
        required: true,
    },
    busyness: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

rankingSchema.index({ user: 1, bathroom: 1 }, { unique: true });

const Ranking = mongoose.model('Ranking', rankingSchema);

module.exports = Ranking; 
