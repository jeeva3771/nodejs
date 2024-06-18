function readStudent(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from test_new.student', (err, result) => {
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function readOneStudent(req, res) {
    const studId = req.params.id;
    const mysqlClient = req.app.mysqlClient;

    try {
        mysqlClient.query('select * from student where id = ?', [studId], (err, result) => {
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(200).send(result[0])

            }
        })
    } catch (error) {
        console.error(error)
    }
}

function createStudent(req, res) {
    const {
        name,
        dob,
        gender,
        emailId,
        courseId,
    } = req.body;
    if (name === '' || dob === '' || gender === '' || emailId === '' || courseId === '') {
        res.status(400).send('invalid input')
    }

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('insert into test_new.student(name,dob,gender,emailId,courseId) values(?,?,?,?,?)', [name, dob, gender, emailId, courseId], function (err, result) {
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(201).send('insert successfully')
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function updateStudent(req, res) {
    const studId = req.params.id;
    const {
        name,
        dob,
        gender,
        emailId,
        courseId,
    } = req.body;

    const values = []
    const updates = []

    if (name !== "") {
        values.push(name)
        updates.push(' name = ?')
    }

    if (dob !== "") {
        values.push(dob)
        updates.push(' dob = ?')
    }

    if (gender !== "") {
        values.push(gender)
        updates.push(' gender = ?')
    }

    if (emailId !== "") {
        values.push(emailId)
        updates.push(' emailId = ?')
    }

    if (courseId !== "") {
        values.push(courseId)
        updates.push(' courseId = ?')
    }

    values.push(studId)
    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('update test_new.student set ' + updates.join(',') + 'where id = ?', values, function (err, result) {
            if (err) {
                console.log(err.sqlMessage)
                return res.status(409).send(err2.sqlMessage)
            } else {
                mysqlClient.query('select * from test_new.student where id = ?', [studId], function (err2, result2) {
                    if (err2) {
                        res.status(409).send(err2.sqlMessage)
                        console.log(err2)
                    } else {
                        res.status(200).send({
                            status: 'successfull',
                            data: result2[0]
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function deleteStudent(req, res) {
    const mysqlClient = req.app.mysqlClient

    const studId = req.params.id;
    try {
        mysqlClient.query('select * from test_new.student where id = ?', [studId], (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
                return res.status(400).send(err2.sqlMessage)

            } else {
                mysqlClient.query('delete from test_new.student where id = ?', [studId], (err2, result2) => {
                    if (err) {
                        res.status(400).send(err2.sqlMessage)
                    } else {
                        res.status(200).send({
                            status: 'deleted',
                            data: result
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
}
//nsnjsnjjn dnn

module.exports = (app) => {
    app.get('/student/:id', readOneStudent)
    app.get('/student', readStudent)
    app.post('/student', createStudent)
    app.put('/student/:id', updateStudent)
    app.delete('/student/:id', deleteStudent)
}