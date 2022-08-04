const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const upload = require('../helpers/uploadFiles');

router.get('/allProducts', categoryControllers.getAllProducts)
router.get('/getAllProductsForAdmin',auth, categoryControllers.getAllProductsForAdmin)
router.get('/getProductById/:id', categoryControllers.getProductById)
router.get('/getAllProductByUserId', auth, categoryControllers.getAllProductByUserId)
router.get('/searchProductByName/:search_term', categoryControllers.searchProductByName)
router.patch('/editProduct', categoryControllers.editProduct)
router.post('/addProduct', auth, categoryControllers.addProduct)
router.delete('/deleteProduct/:id', auth, categoryControllers.deleteProduct)
router.patch("/enableProduct", auth, categoryControllers.enableProduct);
router.patch("/disableProduct", auth, categoryControllers.disableProduct);


module.exports = router;