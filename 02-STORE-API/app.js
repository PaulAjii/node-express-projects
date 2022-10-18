require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')

const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const productsRoute = require('./routes/products')

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// routes
app.get('/', (req, res) => {
    res.send(`
        <h1>STORE API</h1>
        <a href="/api/v1/products">Products Page</a>
    `)
})

// Product routes
app.use('/api/v1/products', productsRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.DB_URI)
        console.log("Connected to DB successfully!")
        app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
    } catch(err) {
        console.log(err)
    }
} 

start()