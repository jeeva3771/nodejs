const express = require('express')
const mysql = require('mysql')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');

// api controllers
const student = require('./apicontroller/student.js')
const course = require('./apicontroller/course.js')
const school = require('./apicontroller/school.js')

// ui controllers
const home = require('./uicontroller/home.js')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/uicontroller/views'));

app.mysqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_new'
})

app.mysqlClient.connect(function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('mysql connected')

        student(app)
        course(app)
        school(app)
        home(app)

        app.listen(2000, () => {
            console.log('listen 2000 port')
        })        
    }
})

