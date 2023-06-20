const express = require('express')
const  mongoose = require ('mongoose')
const dotenv  = require("dotenv")

const cors = require ('cors')

const EmployeeModel = require('./models/Employee.js')
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());



mongoose.connect(process.env.MOMGODB_CONNECT_URL);



app.post('/login',  (req, res)=>{
    const {email, password}= req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("the password is incorrect")
            }
        } else{
            res.json("No record existed")
        }
    })
})


app.post('/register', (req, res)=>{
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => err.json(err))
})





const PORT = process.env.DATABASE_PORT

app.listen(PORT, ()=>{
    console.log('server is running  port ' + PORT);
})