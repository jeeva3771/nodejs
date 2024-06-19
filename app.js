var createError = require('http-errors');
const express = require('express')
const mysql = require('mysql')
var logger = require('morgan')
var cookieParser  = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}))




const student = require('./apicontroller/student.js')
const course = require('./apicontroller/course.js')
const school = require('./apicontroller/school.js')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'ejs');


const mysqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_new'
})

app.mysqlClient = mysqlClient
student(app)
course(app)
school(app)

mysqlClient.connect(function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('mysql connected')
        app.listen(2000, () => {
            console.log('listen 2000port')
        })        
    }
})
