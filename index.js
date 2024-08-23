const express = require("express");
const app = express();
const port = 3000;
const path = require("path")
const {v4:uuidv4} = require('uuid')
const methodeOverride = require("method-override");
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodeOverride("_method"))
app.listen(port,()=>
{
    console.log("Listining to port 3000....")
})


let post = [
    {   
        id:uuidv4(),
        username : "raunak mishra",
        content:"I am a full developre with node"
    },
    {  
        id:uuidv4(),
        username : "roshan mishra",
        content:"I am pythone develper seeking for job"
    },
    {
        id:uuidv4(),
        username : "aditay Bhise",
        content:"i am php developer i love practicle things to do mostly i learn practically"
    },
    { 
        id:uuidv4(),
        username : "Prashik Paikrao",
        content:"I love reading books and writing poems in marathi and self thought in form of lyrics"
    }
]
app.get("/",(req,res)=>{
    res.render("index.ejs",{post});
})

app.get("/post/new",(req,res)=>
{
    res.render("new.ejs");
})

app.post("/posts" ,(req,res)=>
{  let id = uuidv4;
   let {username,content} = req.body;
   post.push({id,username,content});
    res.redirect("/")
})

app.get("/post/:id",(req,res)=>
{
    let {id }= req.params;
    console.log(id)
    let posts = post.find((p)=>
        id === p.id)
    console.log(posts)
    res.render("show.ejs",{posts});
})

app.patch("/post/:id",(req,res)=>
{  
    let {id} = req.params;
    let content =  req.body.content;
    let posts = post.find((p)=>
        id === p.id)
    posts.content = content;
    console.log(posts);
    res.send("patch request is working")
})
app.get("/post/edit/:id",(req,res)=>
{
    let { id } = req.params;
    let content =  req.body.content;
    let posts = post.find((p)=>
        id === p.id)
    console.log(posts)
    res.render("edit.ejs",{posts})
})
app.delete("/posts/:id",(req,res)=>
{
    let { id } = req.params;
   let post = post.fillter((p) => id != p.id);
    let posts = post.find((p)=>
        id === p.id)
    res.redirect("/");
})