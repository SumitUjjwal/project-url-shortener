const express = require('express');
const { connection } = require("./config/db");
const {shortRouter} = require("./routes/shortener.route")

require("dotenv").config();

const PORT = process.env.PORT;
const cors = require("cors");//
const clientDevice = require("express-device");
const useragent = require('express-useragent');

const app = express();//
app.use(cors());//
const cookieParser=require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(clientDevice.capture());
app.use(useragent.express());



app.get('/', (req, res) => { console.log(req.device); res.json({ "msg": "Welcome to Lylliput! on your " + req.device.type.toUpperCase() }) });

const {userRouter}=require("./routes/user.route")
app.use("/users",userRouter)

app.use("/short", shortRouter);
//////////////////////////////////////////////

const {gitAuth}=require("./middlewares/git.auth")
app.use("/",gitAuth)

const {authenticate}=require("./middlewares/authenticate.middle")
// app.use(authenticate)
app.use("/short", shortRouter);

// ///////////////////////////////
// const express=require("express")
// const gitAuth=express.Router()
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// const CLIENT_ID="6257b5c2b3b9aea8134b"
// const CLIENT_SECRET="83d8255d000a2f35407c0c1df177ca37b7cc13c9"


// app.get("/login",(req,res)=>{
//     res.sendFile(__dirname+"/index.html")
// })

// app.get("/auth/github",async(req,res)=>{
//     const {code}=req.query
//     console.log(code)
   
//     const accesstoken=await fetch("https://github.com/login/oauth/access_token",{
//         method:"POST",
//         headers:{
//        "content-type":"application/json",
//        Accept:"application/json"
//         },
    
//     body:JSON.stringify({
//         client_id:CLIENT_ID,
//         client_secret:CLIENT_SECRET,
//         code:code
//     })
//  }).then((res)=>res.json())
//  console.log(accesstoken)

 
//  const userDetails=await fetch("https://api.github.com/user",{
//     headers:{
//     Authorization:`Bearer ${accesstoken.access_token}`
//     }
//  }).then((res)=>res.json())
//  console.log(userDetails)

//  res.send("sign up in progesss")
// })

// app.listen(8080,()=>{
//     console.log("server 8080")
// })




// for fetching data in frontend

//   <a href="https://github.com/login/oauth/authorize?client_id=6257b5c2b3b9aea8134b"><button>continue with github</button></a>
// /////////////////////////////////////////


app.listen(PORT, async () => {
       try {
              await connection;
              console.log("Connected to Database");
              console.log(`Listening on ${PORT}`);
       } catch (error) {
              console.log("Failed while connecting to Database");
              console.log(error);
       }
})