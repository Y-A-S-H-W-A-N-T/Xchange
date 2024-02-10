// EXPRESS CONNECTION

const express = require('express')
const app = express()
const port = 8000
app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`Server is running at http://localhost:${port}`) 
})

// DATABASE CONNECTION

const mongoose = require('mongoose')
const { User, Products } = require('./schema')

const URL = `mongodb+srv://raoyashwant132:Xchange@mobile.qd2x1vb.mongodb.net/Xchange?retryWrites=true&w=majority`
mongoose.connect(URL)
.then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log(err)
})


// MIDDLEWEARS

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// API

app.post('/login',async(req,res)=>{
    console.log("Login Details - ",req.body)
    const result = await User.findOne(req.body)
    console.log(result)
    result?res.json({status: 200,msg: 'User Found in Database', id: result._id}):res.json({status: 400,msg: 'Wrong Credentials'})
})

app.post('/signup',async(req,res)=>{
    console.log("Signup Details - ",req.body)
    const user = new User(req.body)
    const result = await user.save()
    if(result){
        console.log("User Created")
        res.status(200).json({msg: 'details reached for signup'})
    }
    else
    {
        console.log("Error in creating user")
    }
})

app.post('/upload_Product',async(req,res)=>{
    const products = new Products(req.body)
    const result = await products.save()
    result?console.log("Product Uploaded") : console.log("Error in uploading product")
})

app.get('/getProducts',async(req,res)=>{
    const result = await Products.findOne({})
    res.send(result)
    console.log(result)
})