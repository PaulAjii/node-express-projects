const router = require('express').Router()
const {
    // getAllProductsStatic,
    getAllProducts,
    createProduct,
    getProduct
} = require('../controllers/products')

// router.get('/static', getAllProductsStatic)
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct)

module.exports = router