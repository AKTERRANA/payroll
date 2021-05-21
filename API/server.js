const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
var cors = require('cors');

// import models
const List = require('./models/listsModel').List;



  // MIDDLEWARE
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


// Connect to mongodb database
const mongodb = process.env.MONGODB;
mongoose.connect(`${mongodb}`,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Mongodb database connected successfully')
}).catch(()=>{console.log('Database connection failed')});


// CORS Headers middleware

app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
//     res.header(
//         'Access-Control-Expose-Headers',
//         'x-access-token, x-refresh-token'
//     );

    // next();
//   });

// route for /lists
app.get('/lists', (req, res)=>{
     List.find().then((list)=>{
        res.send(list);
     })

})
app.post('/lists', (req,res)=>{
   // const title = req.body.title;
   console.log('before data save')
    const newList = new List(
        {
            title:req.body.title,
            description: req.body.description,
            phone: req.body.phone,
            message: req.body.message
        } 
    )
    newList.save().then((list)=>{
        res.send(list)
        console.log('successfully saved')
    }).catch((err)=>{
        console.log("error is here", err)
    })
})

// start the  server 
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})