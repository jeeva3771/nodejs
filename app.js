const express = require('express')
const mysql = require('mysql')
const logger = require('morgan')
const path = require('path');

// api controllers
const student = require('./apicontroller/student.js')
const course = require('./apicontroller/course.js')
const school = require('./apicontroller/school.js')

// ui controllers
const home = require('./uicontroller/home.js')
const studentUi = require('./uicontroller/studentui.js')
const courseUi = require('./uicontroller/courseui.js')
const schoolUi = require('./uicontroller/schoolui.js')

const app = express()
app.use(logger('dev'))
app.use(express.json())

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
        studentUi(app)
        courseUi(app)
        schoolUi(app)

        app.listen(2000, () => {
            console.log('listen 2000 port')
        })        
    }
})

