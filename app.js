const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const student = require('./modules/student.js')
const course = require('./modules/course.js')
const app = express()
app.use(bodyParser.json())

const mysqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_new'
})

app.mysqlClient = mysqlClient
student(app)
course(app)

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
