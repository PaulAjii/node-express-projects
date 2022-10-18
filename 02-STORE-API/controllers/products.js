const Product = require('../models/product')

const createProduct = async (req, res) => {
    const { name, price, company, featured, rating, createdAt } = req.body

    let productToInsert = { name, price, company }

    if(featured || rating || createdAt) {
        productToInsert = { ...productToInsert, featured, rating, createdAt }
     }

    const product = await Product.create(productToInsert)
    res.status(201).json({ product: product })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if(company) {
        queryObject.company = company
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    // price and rating filter
    if(numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq'
        }
        const regEx = /\b(<|>|=|<=|>=\b)/g
        let filters = numericFilters.
            replace(regEx, 
                (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let result = Product.find(queryObject)

    // sort filter
    if(sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    // fields filter
    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // pagination and limit filter
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result.find(queryObject)
    res.status(200).json({
        products: products,
        nbHits: products.length
    })
}

const getProduct = async (req, res) => {
    const { id: taskID } = req.params

    const product = await Product.findOne({ _id: taskID})
    res.status(200).json({product})
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct
}