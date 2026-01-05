const mongoose = require('mongoose')

const bathroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    overall: { type: Number, min: 0, max: 5, default: 0 },
    cleanliness: { type: Number, min: 0, max: 5, default: 0 },
    busyness: { type: Number, min: 0, max: 5, default: 0},
    numRatings: { type: Number, default: 0 }
});

const Bathroom = mongoose.model('Bathroom', bathroomSchema);
module.exports = Bathroom;