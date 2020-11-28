const express = require(`express`)
const bodyParser = require(`body-parser`)
const ejs = require(`ejs`)
const mongoose = require(`mongoose`)
const { response } = require("express")
const session = require(`express-session`)
const passport = require(`passport`)
const passportLocalMongoose = require(`passport-local-mongoose`)
const { Passport } = require("passport")


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set(`view engine`, `ejs`)
app.use(express.static(`public`))



mongoose.connect('mongodb+srv://TmAdmin:123admin@cluster0.c7khy.mongodb.net/appDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set('useCreateIndex', true)

const loginAppSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    post: {
        type: String,
    }
})

const account = new mongoose.model(`account`, loginAppSchema)

function year() {
    const getDate = new Date();
     return getYear = getDate.getFullYear();
}

const newYear = year();

app.get(`/`, function(req, res){

    res.render(`index`, {year: newYear})
})

app.post(`/`,function(req, res){

    const loginEmail = req.body.loginEmaillers
    const loginPass = req.body.loginPassers

    const loginProcess = new account({
        email: loginEmail,
        password: loginPass
    })  

    account.findOne({email: loginEmail, password: loginPass},function(err, userAcc){
        if (err) {
            console.log(err)
        }
        else if (userAcc) {
                if (userAcc.email === loginProcess.email && userAcc.password === loginProcess.password) {
                    res.redirect(`/home`) 
                    console.log(`Successfully logged in`)   
                } else {
                    console.log(`Eyow`)
                }
            }
    })

    if (loginProcess.email === "" && loginProcess.password === "") {
        console.log(`Please input both`)
        res.render(`failed`, {year: newYear})
    } else if (loginProcess.email && loginProcess.password === "") {
        res.render(`failed`, {year: newYear})
    } else if (loginProcess.email === "" && loginProcess.password) {
        res.render(`failed`, {year: newYear})
    }

})

app.get(`/register`, function(req, res){
    res.render(`register`, {year: newYear})
})

app.post(`/register`, function(req, res){

     const regName = req.body.givenname
    const regLastName = req.body.lastname 
    const regEmail = req.body.email
    const regPass = req.body.password

    const regProcess = new account ({
        name: regName,
        last_name: regLastName,
        email: regEmail,
        password: regPass
    })

    if (regProcess.name === "" && regProcess.last_name === "" && regProcess.email === "" && regProcess.password === "") {
        console.log(`Please input details`)
    } else if (regProcess.name && regProcess.last_name === "" && regProcess.email === "" && regProcess.password === "") {
        console.log(`Please input last name, email and password`)
    } else if (regProcess.name && regProcess.last_name && regProcess.email === "" && regProcess.password === "") {
        console.log(`Please input email and password`)
    } else if (regProcess.name && regProcess.last_name && regProcess.email && regProcess.password === "") {
        console.log(`Please input password`)
    } else if (regProcess.name && regProcess.last_name && regProcess.email && regProcess.password) {
        console.log(`Successfully registered`)
        regProcess.save()
        res.render(`home`, {year: newYear})
    } else {
        console.log(`Well done!`)
    }

})

app.get(`/home`, function(req, res){
    
    res.render(`home`, {year: newYear})
})

app.post(`/home`, function(req, res){

    const posts = req.body.postarea

    const newPost = new account ({
        post: posts
    })

    

    res.redirect(`/home`)
})

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running`)
})