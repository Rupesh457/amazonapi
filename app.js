let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 2021;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
// let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.mongoliveurl;
let db;


//middleware (supporting lib)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req, res) => {
    res.send(`This is Express default server`);
})


// api for categories //
app.get('/categories',(req,res) => {
    let catid = Number(req.query.catid)
    let brandid = Number(req.query.brandid)
    let query = {}
    if( catid && brandid){
        query = {brand_id:brandid,cat_id:catid}
    }
    else if(catid){
       query = {cat_id:catid}
    }else if(brandid){
        query = {brand_id:brandid}
    }
    db.collection('amadata').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result);
    })
})



// api for brands //
app.get('/brands',(req,res) => {
        db.collection('amadata').find().toArray((err,result) =>{
            if(err) throw err;
            res.send(result);
        })
})


//api for cards //
app.get('/cards',(req,res) => {
    db.collection('amadata').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result);

    })
})


/////api for filter by Brands///
app.get('/filter/:brandid',(req,res) => {
    let brandid = Number(req.params.brandid)
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    let query ={}
    if (lcost && hcost){
        query = {brand_id:brandid,
                $and:[{cost:{$gt:lcost,$lt:hcost}}] 
            }
    }else if(brandid){
        query = {brand_id:brandid}
    }
    db.collection('amadata').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result);
    })
})

////by mongo id target ///
// app.get('/details/:id',(req,res) => {
//   let id = mongo.ObjectId(req.params.id)
//   db.collection('amadata').find({_id:id}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

app.get('/details/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('amadata').find({brand_id:id}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })

  app.get('/items/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('products').find({brand_id:id}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })





  /////order api code///
  app.get('/orders',(req,res) => {
    let email = req.query.email
    let query = {}
    if(email){
        // query = {email:email}
        query = {email}
    }
    db.collection('orders').find(query).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })



  //products on basis user selected ids
app.post('/productsitem',(req,res) => {
    if(Array.isArray(req.body)){
      db.collection('products').find({item_id:{$in:req.body}}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
      })
    }else{
      res.send('Invalid Input')
    }
  })



///post api for//
////orders placed//
app.post('/placeorder',(req,res) => {
    console.log(req.body)
    db.collection('orders').insertOne(req.body,(err,result) => {
         if(err) throw err;
        res.send(result)
      })
})

///delete order///
app.delete('/deleteorder/:id',(req,res) => {
    let oid =  mongo.ObjectId(req.params.id)
    db.collection('orders').remove({_id:oid},(err,result) => {
      if(err) throw err;
      res.send('Order Deleted')
    })
})



///update orders///
app.put('/updateorder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
      {order_id:oid},
      {
        $set:{
          "status":req.body.status,
          "bank_name":req.body.bank_name,
          "date":req.body.date
        }
      },(err,result) => {
        if(err) throw err;
        res.send('Order Updated')
      }
    )
})




////connection with db/////
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(`Error While Connecting`);
    db = client.db('amazon');
       app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Express Server listening on port ${port}`);
    })
  })



//   app.get('/mealType/:id',(req,res) => {
//     let mealtypeid = req.params.id
//     let state = req.query.state
//     let country = req.query.country
//     console.log(`>>state>>`,state)
//     console.log(`>>country>>`,country)
//     res.send(id)

//     // db.collection('mealType').find().toArray((err,result) =>{
//     //     if(err) throw err;
//     //     res.send(result);

//     // })
// })
