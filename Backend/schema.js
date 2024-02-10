const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        {
            type: mongoose.Types.ObjectId, ref: 'products'
        }
    ]
})

const products = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    product_price: {
        type: String,
        required: true,
        trim: true
    },
    prodcut_message: {
        type: String,
        trim: true
    },
    product_link: {
        type: String,
        required: true,
        trim: true,
    }
})



const User = mongoose.model('users',user)
const Products = mongoose.model('products',products)

module.exports = { User, Products }