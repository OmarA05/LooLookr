const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/rankingController');
const auth = require('../middleware/auth');

// create new ranking
router.post('/ranking/create/:bathroomId', auth, rankingController.createRanking); // tested

//update ranking
router.patch('/ranking/update/:bathroomId', auth, rankingController.updateRanking); // tested

// get all rankings from user ID
router.get('/ranking/user', auth, rankingController.getByUser); // tested

// get all rankings from bathroom ID
router.get('/ranking/bathroom/:bathroomId', rankingController.getByBathroom); // tested

// get specific ranking using both user and bathroom ID
router.get('/ranking/spec/:bathroomId', auth, rankingController.getRanking); // tested

// get ALL rankings
router.get('/ranking/all', rankingController.getAllRankings); 

// delete ranking
router.delete('/ranking/delete/:bathroomId', auth, rankingController.deleteRanking); // tested

module.exports = router;