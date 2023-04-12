const express = require('express');
const { connection } = require("./config/db");
const { shortRouter } = require("./routes/shortener.route");
const { adminRouter } = require("./routes/admin.route");
const { authRouter } = require("./routes/oAuth.route");
require("dotenv").config();

const PORT = process.env.PORT;
const cors = require("cors");
const clientDevice = require("express-device");
const useragent = require('express-useragent');

const app = express();
app.use(cors());
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(clientDevice.capture());
app.use(useragent.express());


// app.get('/', (req, res) => { console.log(req.ip); res.json({ "msg": "Welcome to Lylliput! on your " + req.device.type.toUpperCase() }) });

const { userRouter } = require("./routes/user.route")
app.use("/users", userRouter);

app.use("/", authRouter);

app.use("/short", shortRouter);

const { authenticate } = require("./middlewares/authenticate.middle")
app.use("/short", shortRouter);
app.use("/admin", adminRouter);

app.listen(PORT, async () => {
       try {
              await connection;
              console.log("Connected to Database");
              console.log(`Listening on ${PORT}`);
       } catch (error) {
              console.log("Failed while connecting to Database");
              console.log(error);
       }
});