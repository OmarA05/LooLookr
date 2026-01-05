const express = require('express');
const mongoose = require('./database/database');
const cors = require('cors');
require('dotenv').config();

// Define routers.
const bathroomRouter = require('./routes/bathroomRoutes');
const rankingRouter = require('./routes/rankingRoutes');
const userRouter = require('./routes/userRoutes');

// Set up app.
const app = express();
app.use(express.json());
app.use(cors());

// Routes.
app.use('/api', bathroomRouter);
app.use('/api', rankingRouter);
app.use('/api', userRouter);

// Define port.
const PORT = process.env.PORT || 3000;

// Start server.
app.listen(PORT, () => {
    console.log('Server started on port', PORT)
});
