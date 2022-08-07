const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const host = "0.0.0.0";


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is running...");
})

app.use('/invoice',require('./routes/invoice'));

app.listen(port,()=>{
    console.log("Server is running on: ");
    console.log(`http://${host}:${port}`);
})