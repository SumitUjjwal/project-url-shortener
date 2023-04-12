const nodemailer = require("nodemailer");

let mailfun = (req, res, next) => {
  const { email } = req.body
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'lillyput.india@gmail.com',
      pass: 'aoqcxyapovdelcdw'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  let otp = Math.floor(Math.random() * 9000 + 1000);
  transporter.sendMail({
    to: `${email}`,
    subject: "Verification Mail",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">LillyPut</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing LillyPut. Use the following OTP to complete your account verificaion.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />LillyPut</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>LillyPut Inc</p>
            <p>India</p>
          </div>
        </div>
      </div>`
  }).then(() => {
    console.log("mail sent successfully");
    console.log(otp);
    res.json({ "OTP": otp });
    next()
  }).catch((err) => {
    console.log(err);
    console.log("err in sending mail");
    res.json({ "Error": err });
  })
}

module.exports = {
  mailfun
}