require('dotenv').config()
const express = require(`express`)
const bodyParser = require(`body-parser`)
const ejs = require(`ejs`)
const mongoose = require(`mongoose`)
const jwt = require(`jsonwebtoken`)
const cookieSession = require('cookie-session')

const app = express()

app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({extended: true}))
app.set(`view engine`, `ejs`)
app.use(express.static(`public`))
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

mongoose.connect(process.env.LOREM_TALK, {useNewUrlParser: true, useUnifiedTopology: true});

const loginAppSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    post: {
        type: String,
    }
})

// hehe

const account = new mongoose.model(`account`, loginAppSchema)

function year() {
    const getDate = new Date();
     return getYear = getDate.getFullYear();
}

const newYear = year();

app.get(`/`, function(req, res){

    const kuki = req.session.ID 

    if (!kuki) {
        res.render(`index`, {year: newYear})
    } else {
        res.render(`home`, {year: newYear})
    }


})

app.post(`/`,function(req, res){

    const loginEmail = req.body.loginEmaillers
    const loginPass = req.body.loginPassers

    const loginProcess = new account({
        username: loginEmail,
        password: loginPass
    })  

    account.findOne({username: loginEmail, password: loginPass}, function(err, userAcc){
        if (err) {
            console.log(err)
        }
        else if (userAcc) {
                if (userAcc.username === loginProcess.username && userAcc.password === loginProcess.password) {

                    const kuki = req.session.ID = userAcc._id
                    console.log(kuki)

                    res.redirect(`/home`)
                } else {
                    res.render(`failed`, {year: newYear})
                }
            } else {
                res.render(`failed`, {year: newYear})
            }
    })

    if (loginProcess.username === "" && loginProcess.password === "") {
        console.log(`Please input both`)
        res.render(`failed`, {year: newYear})
    } else if (loginProcess.username && loginProcess.password === "") {
        res.render(`failed`, {year: newYear})
    } else if (loginProcess.username === "" && loginProcess.password) {
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
        username: regEmail,
        password: regPass
    })

    console.log(regName, regLastName, regEmail, regPass)

    if (regProcess.name === "" && regProcess.last_name === "" && regProcess.username === "" && regProcess.password === "") {
        console.log(`Please input details`)
        res.render(`failed`, {year: newYear})
    } else if (regProcess.name && regProcess.last_name === "" && regProcess.username === "" && regProcess.password === "") {
        console.log(`Please input last name, email and password`)
        res.render(`failed`, {year: newYear})
    } else if (regProcess.name && regProcess.last_name && regProcess.username === "" && regProcess.password === "") {
        console.log(`Please input email and password`)
        res.render(`failed`, {year: newYear})
    } else if (regProcess.name && regProcess.last_name && regProcess.username && regProcess.password === "") {
        console.log(`Please input password`)
        res.render(`failed`, {year: newYear})
    } else if (regProcess.name && regProcess.last_name && regProcess.username && regProcess.password) {
        console.log(`Successfully registered`)
        regProcess.save()
        const kuki = req.session.ID = regProcess._id
        console.log(kuki)
        res.render(`home`, {year: newYear})
    } else {
        console.log(`Well done!`)
        res.render(`failed`, {year: newYear})
    }

})

app.get(`/home`, function(req, res){

    const kuki = req.session.ID

    if (!kuki) {
        res.redirect(`/`)
    } else {
        res.render(`home`, {year: newYear})
    }

})

app.post(`/logout`, (req, res) => {

    const kuki = req.session.ID = null
    
    res.redirect(`/`)
})

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running`)
})