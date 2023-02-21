const express = require('express');
const { connection } = require("./config/db");
const {shortRouter} = require("./routes/shortener.route")

require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();
app.use(cors());

app.get('/', (req, res) => { res.json({ "msg": "Welcome to Lylliput!" }) });

app.use("/short", shortRouter);

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

