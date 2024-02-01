const express = require("express")
const connectdb = require("./config/dbconnection")
const app = express()
const dotenv = require("dotenv").config()
app.use(express.json())
connectdb()
const cors = require('cors');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://formdbfrontend.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  
  app.use(cors());

const port = process.env.PORT || 4000
app.use(require("./routes/userroutes"))

app.listen(process.env.port,()=>{
    console.log("server started");
})