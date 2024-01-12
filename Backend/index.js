const express = require('express')
const port = 8000
const app = express()


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/login',(req,res)=>{
    console.log("Login Details - ",req.body)
    res.status(200).json({msg: 'details reached for login'})
})

app.post('/signup',(req,res)=>{
    console.log("Signup Details - ",req.body)
    res.status(200).json({msg: 'details reached for signup'})
})

app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`Server is running at http://localhost:${port}`) 
})