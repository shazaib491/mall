const express = require("express");
const cors = require('cors')
const createError = require("http-errors");
var  dotenv = require("dotenv").config();
require("./configurations/mongoose");
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

//routes

const authRouter = require('./routes/authRouter');


const app = express();
app.use(cors())
app.use(express.json());

app.use(authRouter);

// if route does't exist it will raise the error
app.get('/',(req, res)=>{
  res.send("Server is Listening")
})

app.use(async (req, res, next) => {
  next(createError.NotFound("the route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server is listening on the port " + port);
});
