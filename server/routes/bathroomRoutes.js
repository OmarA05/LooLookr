const express = require('express');
const router = express.Router();
const bathroomController = require('../controllers/bathroomController');
const auth = require('../middleware/auth');


// Add new bathroom.
router.post('/bathrooms', bathroomController.add);

// Get bathroom by ID.
router.get('/bathrooms/:id', bathroomController.get);

// Get all bathrooms
router.get('/bathrooms', bathroomController.getAll);

// Rate a bathroom.
router.patch('/bathrooms/:id/rate', bathroomController.rate);

// Update a bathroom.
router.patch('/bathrooms/:id/update', bathroomController.update);

module.exports = router;