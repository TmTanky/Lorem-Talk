require('dotenv').config()
const express = require(`express`)
const bodyParser = require(`body-parser`)
const ejs = require(`ejs`)
const mongoose = require(`mongoose`)
const jwt = require(`jsonwebtoken`)


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set(`view engine`, `ejs`)
app.use(express.static(`public`))



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

// function auth(req, res, next) {
//     const token = req.header(`auth-token`)
//     if (!token) {
//         res.redirect(`failed`)
//     } 

//     else if (token) {
//         const verified = jwt.verify(token, `salamatshopee`)
//         req.loginProcess = verified
//         console.log(token)
//         next()
//     } else {
//         res.redirect(`/`)
//         console.log(err)
//     }
// }

// function authToken(req, res, next, err) {
//     const token = req.headers(`auth-token`)
    
//     console.log(token)

//     if(err) {
//         console.log(err)
//     } else if (token) {
//         console.log(token)
//         res.render(`home`, {year: newYear})
//         next()
//     } else {
//         console.log(`bano`)
//     }

    
// }

const newYear = year();

app.get(`/`, function(req, res){

    res.render(`index`, {year: newYear})
})

app.post(`/`,function(req, res){

    const loginEmail = req.body.loginEmaillers
    const loginPass = req.body.loginPassers

    const loginProcess = new account({
        username: loginEmail,
        password: loginPass
    })  

    account.findOne({username: loginEmail, password: loginPass},function(err, userAcc){
        if (err) {
            console.log(err)
        }
        else if (userAcc) {
                if (userAcc.username === loginProcess.username && userAcc.password === loginProcess.password) {
                    res.redirect(`/home`)

                    console.log(userAcc)  
                } else {
                    console.log(`Eyow`)
                }
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
        res.render(`home`, {year: newYear})
    } else {
        console.log(`Well done!`)
        res.render(`failed`, {year: newYear})
    }

})

app.get(`/home`, function(req, res){

    res.render(`home`, {year: newYear})
})

app.get(`/secret`, function(req, res){
    res.send(`Bano ka`)
})


app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running`)
})