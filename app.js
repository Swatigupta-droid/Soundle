require('dotenv').config();
var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
var app = express();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("Connected");
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');


app.get("/",function(req,res){
    res.render("homepage");
});

app.use(passport.initialize());
app.use(passport.session());



app.listen(8080, function(){
    console.log("connect!");
});
