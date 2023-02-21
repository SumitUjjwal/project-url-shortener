const express = require('express');
const { connection } = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();
app.use(cors());

app.get('/', (req, res) => { res.json({ "msg": "Welcome to Lylliput!" }) });

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

