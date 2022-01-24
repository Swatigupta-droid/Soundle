require('dotenv').config();
var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
var app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');

const postSchema = {
    title: String,
    content: String,
    img: String
  };

 const Post = mongoose.model("new", postSchema);

 app.post("/create", function(req, res){

    const post = new Post({
      title: req.body.postHeading,
      content: req.body.postContent,
      img: req.body.postImg
    });
  
  
    post.save(function(err){
      if(!err){
        res.redirect("/create");
      }
      
    });
  });
  app.get("/new/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Post.find({_id: requestedPostId}, function(err, post){
        res.render("new", {
          title: post.title,
          content: post.content,
          img: post.img
        });
      });
    
    });

app.get("/",function(req,res){
    res.render("homepage");
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/post",function(req,res){
    res.render("post");
});
app.get('/create',function(req,res)
{
    res.render('create')
})
app.get("/new", function(req, res){

  
    Post.find({}, function(err, post){
      res.render("new", {
        title: post.title,
        content: post.content,
        img: post.img,
        posts:post
      });
    });
  
  });

app.use(passport.initialize());
app.use(passport.session());



app.listen(8080, function(){
    console.log("connect!");
});
