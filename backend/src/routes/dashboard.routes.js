// backend/src/routes/dashboard.routes.js
const express = require('express');
const router = express.Router();
const { getDashboardMetrics } = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/metrics', authMiddleware, getDashboardMetrics);

module.exports = router;
