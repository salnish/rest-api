const express = require ('express');
const mongoose = require ('mongoose');
const dbConfig = require ('./config/db.config');

const auth =require('./middlewares/auth');
const errors =require('./middlewares/errors');

const unless = require('express-unless');
const { db } = require('./config/db.config');


const app =express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser:true,
    useUnifieldTopology:true
}).then(
    ()=> {
        console.log ('Database connected');
    },
    (error)=> {
        console.log('database not connected :'+error);
    }
);

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path:[
            { url : "/users/login",methods:["POST"]},
            { url :"/user/register",methods:["POST"]}
        ]
    })
);

app.use(express.json());

app.use("/users",require("./routes/user.route"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000,function(){
    console.log("Ready to Go");
})