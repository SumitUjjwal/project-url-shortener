const nodemailer=require("nodemailer")

const cookieParser=require("cookie-parser")
let mailfun=(req,res,next)=>{
    const transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        // port: 587,
        service:"gmail",
        auth: {
            user: 'singh.saurabh301199@gmail.com',
            pass: 'jnzkrhiqmmiyxsym'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let otp=Math.floor(Math.random()*10000)
    // to: 'manoharmeena245@gmail.com',
    transporter.sendMail({
        to: 'singh.saurabh301199@gmail.com',
         from: 'singh.me457@gmail.com',
         subject:"this is mail class",
         text: `your otp is ${otp}`
        //  html:"<h1>hii</h1>"
    }).then(()=>{
        console.log("mail sent successfully")
        res.cookie("otp",otp)
        next()
      
    }).catch((err)=>{
        console.log(err)
        console.log("err in mail sent")
    })
}
module.exports ={mailfun}