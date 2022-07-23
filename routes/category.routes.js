const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/category.controller');
const auth = require('../middleware/auth');

router.get('/allcategories', auth, categoryControllers.getAllCategories)
router.post('/addCategory', auth, categoryControllers.addCategory)

module.exports = router;