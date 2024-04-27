const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

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
    ],
    profilePic_link: {
        type: String,
        trim: true
    }
},{
    timestamps: true
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
    product_message: {
        type: String,
        trim: true
    },
    product_link: {
        type: String,
        required: true,
        trim: true,
    },
    product_owner: {
        type: String,
        required: true,
        trim: true,
    },
    upload_month: {
        type: String,
        required: true,
        trim: true,
    },
    upload_date: {
        type: String,
        required: true,
        trim: true,
    },
    upload_time: {
        type: String,
        required: true,
        trim: true,
    },
    upload_min: {
        type: String,
        required: true,
        trim: true,
    },
    chats:[
        {
            sender: {
                type: String,
            },
            message: {
                type: String,
            },
            owner: {
                type: Boolean,
            }
        },
    ]
}, {
    timestamps: true
})



const User = mongoose.model('users',user)
const Products = mongoose.model('products',products)

module.exports = { User, Products }