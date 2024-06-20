function readSchool(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from school', (err, result) => {
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

function readOneSchool(req, res) {
    const studId = req.params.id;
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from school where id = ?', [studId], (err, result) => {
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

function createSchool(req, res) {
    const {
        name,
        place
    } = req.body;

    if (name === '' || place === '') {
        res.status(400).send('invalid input')
    }

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('insert into school(name,place) values(?,?)', [name, place], function (err, result) {
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

function updateSchool(req, res) {

    const studId = req.params.id;
    const {
        name = null,
        place = null
    } = req.body;

    const values = []
    const updates = []

    if (name) {
        values.push(name)
        updates.push(' name = ?')
    }

    if (place) {
        values.push(place)
        updates.push(' place = ?')
    }

    values.push(studId)

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('update school set ' + updates.join(',') + ' where id = ?', values, function (err, result) {
            if (err) {
                console.log(err.sqlMessage)
                return res.status(409).send(err2.sqlMessage)
            } else {
                mysqlClient.query('select * from school where id = ?', [studId], function (err2, result2) {
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

function deleteSchool(req, res) {

    const studId = req.params.id;
    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('select * from school where id = ?', [studId], (err, result) => {
            if (err) {
                console.err(err.sqlMessage)
                return res.status(400).send(err2.sqlMessage)

            } else {
                mysqlClient.query('delete from school where id = ?', [studId], (err2, result2) => {
                    if (err) {
                        res.status(400).send(err2.sqlMessage)
                    } else {
                        res.status(200).send({
                            status: 'deleted successfull',
                            data: result[0]
                        })
                    }
                })
            }
        })
    } catch (err) {
        console.err(err)
    }
}
module.exports = (app) => {
    app.get('/school', readSchool)
    app.get('/school/:id', readOneSchool)
    app.post('/school', createSchool)
    app.put('/school/:id', updateSchool)
    app.delete('/school/:id', deleteSchool)
}

function readSchool(req, res) {
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from school', (err, result) => {
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

function readOneSchool(req, res) {
    const studId = req.params.id;
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from school where id = ?', [studId], (err, result) => {
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

function createSchool(req, res) {
    const {
        name,
        place
    } = req.body;

    if (name === '' || place === '') {
        res.status(400).send('invalid input')
    }

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('insert into school(name,place) values(?,?)', [name, place], function (err, result) {
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

function updateSchool(req, res) {

    const studId = req.params.id;
    const {
        name = null,
        place = null
    } = req.body;
    
    const values = []
    const updates = []
    if (name) {
        values.push(name)
        updates.push(' name = ?')
    }

    if (place) {
        values.push(place)
        updates.push(' place = ?')
    }
    values.push(studId)

    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('update school set ' + updates.join(',') + ' where id = ?', values, function (err, result) {
            if (err) {
                console.log(err.sqlMessage)
                return res.status(409).send(err2.sqlMessage)
            } else {
                mysqlClient.query('select * from school where id = ?', [studId], function (err2, result2) {
                    if (err2) {
                        res.status(409).send(err2.sqlMessage)
                    } else {
                        res.status(200).send({
                            status: 'success',
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

function deleteSchool(req, res) {
    const studId = req.params.id;
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from school where id = ?', [studId], (err, result) => {
            if (err) {
                console.err(err.sqlMessage)
                return res.status(400).send(err2.sqlMessage)

            } else {
                mysqlClient.query('delete from school where id = ?', [studId], (err2, result2) => {
                    if (err) {
                        res.status(400).send(err2.sqlMessage)
                    } else {
                        res.status(200).send({
                            status: 'deleted successfull',
                            data: result[0]
                        })
                    }
                })
            }
        })
    } catch (err) {
        console.err(err)
    }
}
module.exports = (app) => {
    app.get('/api/school', readSchool)
    app.get('/api/school/:id', readOneSchool)
    app.post('/api/school', createSchool)
    app.put('/api/school/:id', updateSchool)
    app.delete('/api/school/:id', deleteSchool)
}

