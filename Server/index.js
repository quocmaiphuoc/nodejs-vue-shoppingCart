const express = require('express')
const keys = require('./config/keys')
const mongodb = require('./database/database')
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')

const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/apiproduct',productRouter);
app.use('/apiuser',userRouter);
app.use('/apiauth',authRouter);
app.listen(keys.server.PORT,()=>{
    console.log(`Server is running port: ` + keys.server.PORT)
})