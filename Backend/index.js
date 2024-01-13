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
const User = require('./schema')

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

app.post('/login',(req,res)=>{
    console.log("Login Details - ",req.body)
    res.status(200).json({msg: 'details reached for login'})
})

app.post('/signup',(req,res)=>{
    console.log("Signup Details - ",req.body)
    const user = new User({
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    })
    const result = user.save()
    if(result){
        console.log("User Created")
        res.status(200).json({msg: 'details reached for signup'})
    }
    else
    {
        console.log("Error in creating user")
    }
})