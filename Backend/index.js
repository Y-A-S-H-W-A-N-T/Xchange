// EXPRESS CONNECTION
const express = require('express')
const http = require('http');
const app = express()
const port = 8000

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

//  Socket Connection

const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', socket => {
    socket.on('connected',()=>{
        console.log("User Connected")
    })


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', data => {
        console.log(data)
        io.emit('chat message', data)
    })
});

server.listen(port,(err)=>{
    if (err) throw err;
    console.log(`Server is running at http://172.19.79.183:${port}`) 
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
    console.log(req.body)
    const products = new Products(req.body)
    const result = await products.save()
    result?console.log("Product Uploaded") : console.log("Error in uploading product")
    const obj_id = new mongoose.Types.ObjectId(products.id)
    await User.updateOne(
        {
            _id: req.body.product_owner
        },
        {
            $push:{
                products: obj_id
            }
        }
    ).then(()=>{
        console.log("Updated User Products")
    }).catch((err)=>{
        console.log("Error in updating user products ->",err)
    })
    
})

app.get('/getProducts',async(req,res)=>{
    const result = await Products.find({})
    res.send(result)
})

app.post('/getProducts',async(req,res)=>{
    data = req.body.products
    var products = []
    try {
        await Promise.all(data.map(async (id) => {
            const result = await Products.find({ _id: id });
            products.push(result);
        }))
        res.send(products);
    } catch (error) {
        res.status(500).send("Error fetching products: " + error.message);
    }

})

app.get('/userProducts',async(req,res)=>{
    const result =await User.find({}).populate({path: 'products', model: 'products'})
    res.send(result)
})

app.post('/upload_profile_pic',async(req,res)=>{
    console.log(req.body)
    await User.updateOne(
        {
            _id: req.body.id
        },
        {
            profilePic_link: req.body.link
        }
    ).then(()=>{
        console.log("Added Profile Pic")
        res.status(200)
    }).catch((err)=>{
        console.log("Profile pic uploading Error ->",err)
        res.status(404)
    })
})


app.post('/userDetails',async(req,res)=>{
    console.log("incomming - ",req.body)
    const result = await User.findOne({_id: req.body.id}).catch((e)=>console.log(e))
    res.send(result)
})

app.post('/delete_my_product',async(req,res)=>{
    const result = await Products.deleteOne({_id: req.body.id})
    console.log(result)
    const check = await User.updateOne({_id: req.body.user_id},{$pull: {products : req.body.id}})
    console.log("YE - ",check)
})