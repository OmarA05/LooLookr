const Ranking = require('../schemas/rankingSchema');

// create new ranking
exports.createRanking = async (req, res) => {
    try {
        const user = req.user.id;
        const bathroom = req.params.bathroomId.trim();
        const { cleanliness, busyness } = req.body;

        const newRanking = new Ranking({
            user,
            bathroom,
            cleanliness,
            busyness
        });

        await newRanking.save();

        res.status(201).json({
            user: newRanking.user,
            bathroom: newRanking.bathroom,
            cleanliness: newRanking.cleanliness,
            busyness: newRanking.busyness
        });

    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'You have already ranked this bathroom' });
        } else {
            res.status(400).json({ message: 'Something went wrong', error: err.message });
        }
    }
};


// update ranking
exports.updateRanking = async (req, res) => {
    try {
        const bathroomId = req.params.bathroomId.trim();
        const userId = req.user.id;
        const { cleanliness, busyness } = req.body;

        const ranking = await Ranking.findOne({ user: userId, bathroom: bathroomId });

        if (!ranking) {
            return res.status(404).json({ message: 'Ranking not found' });
        }

        ranking.cleanliness = cleanliness;
        ranking.busyness = busyness;

        const updatedRanking = await ranking.save(); // Save changes to DB

        return res.status(200).json(updatedRanking);

    } catch (err) {
        res.status(500).json({ message: 'Error updating ranking.', error: err.message });
    }
};


// gets all rankings from userID
exports.getByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const rankings = await Ranking.find({ user: userId }).populate('user').populate('bathroom');

        if (!rankings || rankings.length === 0){

            return res.status(404).json({message: 'No rankings found for user'});
        }
        res.status(200).json(rankings);
    } catch (err){
        res.status(500).json({message: 'Error fetching rankings', error: err.message });
    }
};

// get all rankings from bathroomID
exports.getByBathroom = async (req, res) => {
    try {
        const bathroomId = req.params.bathroomId.trim();

        const rankings = await Ranking.find({ bathroom: bathroomId}).populate('user').populate('bathroom');

        if (!rankings || rankings.length === 0){
            return res.status(404).json({message: 'No rankings found for bathroom'});
        }
        res.status(200).json(rankings);
    } catch (err) {
        res.status(500).json({message: 'Error fetching rankings', error: err.message});

    }
}

// get specific ranking
exports.getRanking = async (req, res) => {
    try {
        const bathroomId = req.params.bathroomId.trim();
        const userId = req.user.id;

        const rankings = await Ranking.findOne({ bathroom: bathroomId, user: userId}).populate('user').populate('bathroom');

        if (!rankings || rankings.length === 0){
            return res.status(404).json({message: 'Ranking not Found'});
        }
        res.status(200).json(rankings);
    } catch (err) {
        res.status(500).json({message: 'Error fetching ranking', error: err.message});
    }
}

// get All rankings
exports.getAllRankings = async (req, res) => {
    try {
        const rankings = await Ranking.find().populate('user').populate('bathroom');

        if (!rankings || rankings.length === 0){
            return res.status(404).json({message: 'No rankings found'});
        }
        res.status(200).json(rankings);
    } catch (err) {
        req.status(500).json({message: 'Error fetching rankings', error: err.message});
    }
}

// delete ranking
exports.deleteRanking = async (req, res) => {
    try {
        const bathroomId = req.params.bathroomId.trim();
        const userId = req.user.id;

        // Find and delete the ranking for this user and bathroom
        const ranking = await Ranking.findOneAndDelete({ user: userId, bathroom: bathroomId });

        if (!ranking) {
            return res.status(404).json({ message: 'Ranking not found or already deleted' });
        }

        // Successfully deleted ranking
        return res.status(200).json({ message: 'Ranking deleted successfully' });

    } catch (err) {
        return res.status(500).json({ message: 'Error deleting ranking', error: err.message });
    }
};