function readCourse(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from course', (err, result) => {
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(200).json(result)
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
        courseDescription
    } = req.body;

    if (courseName === '' || courseDescription === '') {
        res.status(400).send('invalid input')
    }

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('insert into course(courseName,courseDescription) values(?,?)', [courseName, courseDescription], function (err, result) {
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
        courseDescription = null
    } = req.body;

    const values = []
    const updates = []

    if (courseName) {
        values.push(courseName)
        updates.push(' courseName = ?')
    }

    if (courseDescription) {
        values.push(courseDescription)
        updates.push(' courseDescription = ?')
    }

    values.push(studId)
    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('update course set ' + updates.join(',') + ' where id = ?', values, function (err, result) {
            if (err) {
                return res.status(409).send(err.sqlMessage)
            } else {
                mysqlClient.query('select * from course where id = ?', [studId], function (err2, result2) {
                    if (err2) {
                        res.status(409).send(err2.sqlMessage)
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
                return res.status(400).send(err.sqlMessage)

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
    app.get('/api/course', readCourse)
    app.get('/api/course/:id', readOneCourse)
    app.post('/api/course', createCourse)
    app.put('/api/course/:id', updateCourse)
    app.delete('/api/course/:id', deleteCourse)
}

