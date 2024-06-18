function readCourse(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from course', (err, result) => {
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function readOneCourse(req, res) {
    const mysqlClient = req.app.mysqlClient
    const studId = req.params.id;
    try {
        mysqlClient.query('select * from course where id = ?', [studId], (err, result) => {
            if (err) {
                res.status(404).send(err.sqlMessage)
            } else {
                res.status(200).send(result[0])
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function createCourse(req, res) {
    const {
        courseName,
        description
    } = req.body;

    if (courseName === '' || description === '') {
        res.status(400).send('invalid input')
    }

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('insert into course(courseName,description) values(?,?)', [courseName, description], function (err, result) {
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

function updateCourse(req, res) {
    const studId = req.params.id;
    const {
        courseName = null,
        description = null
    } = req.body;

    const values = []
    const updates = []

    if (courseName) {
        values.push(courseName)
        updates.push(' courseName = ?')
    }

    if (description) {
        values.push(description)
        updates.push(' description = ?')
    }

    values.push(studId)
    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('update course set ' + updates.join(',') + ' where id = ?', values, function (err, result) {
            if (err) {
                console.log(err.sqlMessage)
                return res.status(409).send(err2.sqlMessage)
            } else {
                mysqlClient.query('select * from course where id = ?', [studId], function (err2, result2) {
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

function deleteCourse(req, res) {
    const studId = req.params.id;

    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from course where id = ?', [studId], (err, result) => {
            if (err) {
                console.log(err.sqlMessage)
                return res.status(400).send(err2.sqlMessage)

            } else {
                mysqlClient.query('delete from course where id = ?', [studId], (err2, result2) => {
                    if (err) {
                        res.status(400).send(err2.sqlMessage)
                    } else {
                        res.status(200).send({
                            status: 'deleted',
                            data: result[0]
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = (app) => {
    app.get('/course', readCourse)
    app.get('/course/:id', readOneCourse)
    app.post('/course', createCourse)
    app.put('/course/:id', updateCourse)
    app.delete('/course/:id', deleteCourse)
}

