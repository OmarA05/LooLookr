const Bathroom = require('../schemas/bathroomSchema');

// Add a bathroom.
exports.add = async (req, res) => {
    try {
        const { name, location } = req.body;
        const bathroom = new Bathroom({ name, location });
        await bathroom.save();
        return res.status(201).json({status: 'Bathroom successfully added.'});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// Get a bathroom.
exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const bathroom = await Bathroom.findById(id);

        if (!bathroom) {
            return res.status(404).json({error: 'Bathroom not found!'});
        }

        return res.status(200).json(bathroom);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

// Get all bathrooms.
exports.getAll = async (req, res) => {
    try {
        const bathrooms = await Bathroom.find();

        if (!bathrooms || bathrooms.length == 0) {
            return res.status(404).json({error: 'No bathrooms found.'})
        }

        return res.status(200).json(bathrooms);
    } catch (e) {
        res.status(400).json({error: e.message})
    }
};

// Rate a bathroom.
exports.rate = async (req, res) => {
    try {
        const { id } = req.params;
        const { cleanliness, busyness } = req.body;

        // Check if cleanliness rating follows guidelines.
        if (!cleanliness || cleanliness < 0 || cleanliness > 5) {
            return res.status(400).json({error: 'Cleanliness must be between 0 and 5!'});
        }

        // Check if busyness rating follows guidelines.
        if (!busyness || busyness < 0 || busyness > 5) {
            return res.status(400).json({error: 'Busyness must be between 0 and 5!'});
        }

        // Get bathroom and check if it exists.
        const bathroom = await Bathroom.findById(id);
        if (!bathroom) {
            return res.status(404).json({error: 'Bathroom not found!'});
        }

        // Calculate current totals.
        const totalOverall = bathroom.overall * bathroom.numRatings;
        const totalClean = bathroom.cleanliness * bathroom.numRatings;
        const totalBusy = bathroom.busyness * bathroom.numRatings;

        bathroom.numRatings++;

        const newOverall = (cleanliness + busyness) / 2;

        // Assign new values.
        bathroom.overall = (totalOverall + newOverall) / bathroom.numRatings;
        bathroom.cleanliness = (totalClean + cleanliness) / bathroom.numRatings;
        bathroom.busyness = (totalBusy + busyness) / bathroom.numRatings;

        await bathroom.save();

        return res.status(200).json({status: 'Bathroom successfully rated.'})

    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldCleanliness, oldBusyness, newCleanliness, newBusyness } = req.body;

        // Get bathroom and check if it exists.
        const bathroom = await Bathroom.findById(id);
        if (!bathroom) {
            return res.status(404).json({error: 'Bathroom not found!'});
        }

        // Calculate overalls.
        const oldOverall = (oldCleanliness + oldBusyness) / 2;
        const newOverall = (newCleanliness + newBusyness) / 2;

        // Update.
        bathroom.cleanliness = ((bathroom.cleanliness * bathroom.numRatings) - oldCleanliness + newCleanliness) / bathroom.numRatings;
        bathroom.busyness = ((bathroom.busyness * bathroom.numRatings) - oldBusyness + newBusyness) / bathroom.numRatings;
        bathroom.overall = ((bathroom.overall * bathroom.numRatings) - oldOverall + newOverall) / bathroom.numRatings;

        await bathroom.save();

        return res.status(200).json({status: 'Bathroom successfully updated.'});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};