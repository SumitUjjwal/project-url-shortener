const express=require("express")
const gitAuth=express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
gitAuth.get("/",(req,res)=>{
    res.send("base api")
})

const CLIENT_ID="6257b5c2b3b9aea8134b"
const CLIENT_SECRET="83d8255d000a2f35407c0c1df177ca37b7cc13c9"


gitAuth.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

gitAuth.get("/auth/github",async(req,res)=>{
    const {code}=req.query
    console.log(code)
   
    const accesstoken=await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers:{
       "content-type":"application/json",
       Accept:"application/json"
        },
    
    body:JSON.stringify({
        client_id:CLIENT_ID,
        client_secret:CLIENT_SECRET,
        code:code
    })
 }).then((res)=>res.json())
 console.log(accesstoken)

 
 const userDetails=await fetch("https://api.github.com/user",{
    headers:{
    Authorization:`Bearer ${accesstoken.access_token}`
    }
 }).then((res)=>res.json())
 console.log(userDetails)

 res.send("sign up in progesss")
})

// gitAuth.listen(8080,()=>{
//     console.log("server 8080")
// })

module.exports={gitAuth}


// for fetching data in frontend

//   <a href="https://github.com/login/oauth/authorize?client_id=6257b5c2b3b9aea8134b"><button>continue with github</button></a>