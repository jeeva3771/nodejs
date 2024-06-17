const express = require('express')
const mysql = require('mysql')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_new'
})
con.connect(function(err){
    if(err){
        console.error(err)
    }else{
        console.log('mysql connected')
    }


    //comments

    ///
})
function readStudent(req, res){
    try{
        con.query('select * from test_new.student',(err, result) => {
            if(err){
                res.status(409).send(err.sqlMessage)
            }else{
                res.status(200).send(result)
            }
        })
    }catch(error){
        console.log(error)
    }
}

function createStudent(req, res){
    const {
        name,
        dob,
        gender,
        emailId
    } = req.body;
    if (name === '' || dob === '' || gender === '' || emailId === ''){
        res.status(400).send('invalid input')
    }
    try{
        con.query('insert into test_new.student(name,dob,gender,emailId) values(?,?,?,?)',[name,dob,gender,emailId],function(err, result) {
            if(err){
                res.status(409).send(err.sqlMessage)
            }else{
                res.status(201).send('insert successfully')
            }
        })
    }catch(error){
        console.error(error)
    }
}

function updateStudent(req, res) {
    const studId = req.params.id;
    const {
        name,
        dob,
        gender,
        emailId
    } = req.body;
    try{
        con.query('update test_new.student set name = ?,dob = ?,gender = ?,emailId = ? where id = ?',[name,dob,gender,emailId,studId],function (err, result){
            if(err){
                console.log(err.sqlMessage)
            }else{
                console.log(result)
            }
            con.query('select * from test_new.student where id = ?',[studId], function(err2, result2){
                if(err2){
                    res.status(409).send(err2.sqlMessage)
                    console.log(err2)
                }else{
                    res.status(204).send(result2[0])
                }
            })
        })
    } catch(error){
        console.error(error)
    }
}

function deleteStudent(req, res){
    const studId = req.params.id;
    try{
        con.query('select * from test_new.student where id = ?',[studId],(err, result) => {
            if(err){
                console.log(err.sqlMessage)
            }else{
                console.log(result)
            }
        con.query('delete from test_new.student where id = ?',[studId],(err2, result2)=> {
            if(err){
                res.status(400).send(err2.sqlMessage)
            }else{
                res.status(204).send(result2)
            }
        })
    })
}catch(error){
    console.error(error)
}
}

app.get('/student', readStudent)
app.post('/student', createStudent)
app.put('/student/:id', updateStudent)
app.delete('/student/:id', deleteStudent)

app.listen(2000, ()=>{
    console.log('listen 2000port')
})
.....