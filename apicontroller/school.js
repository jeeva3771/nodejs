function readSchool(req, res) {
    const {
        page = 1,
        limit = 2       
    } = req.query;
    const mysqlClient = req.app.mysqlClient
    var num = parseInt(limit)

    const offset = (parseInt(page)- 1) * num  

    try {
        mysqlClient.query('select count(*) as totalSchool from school', (err, result) => {
            console.log(result)
            if (err) {
                return res.status(400).send(err.sqlMessage)
            } else {
                mysqlClient.query('select * from school limit ? offset ?', [num,offset], (err2, result2) => {
                    if (err2) {
                       return res.status(409).send(err2)
                    } else {
                        res.status(200).send({
                          totalSchool: result[0].totalSchool,
                          page: page,
                          limit : num,
                          data: result2

                    })
                    }
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
}


function readOneSchool(req, res) {
    const sclId = req.params.id;
    const mysqlClient = req.app.mysqlClient
    try {
        mysqlClient.query('select * from school where id = ?', [sclId], (err, result) => {
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

    const sclId = req.params.id;
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

    values.push(sclId)

    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('update school set ' + updates.join(',') + ' where id = ?', values, function (err, result) {
            if (err) {
                return res.status(409).send(err.sqlMessage)
            } else {
                mysqlClient.query('select * from school where id = ?', [sclId], function (err2, result2) {
                    if (err2) {
                        return res.status(409).send(err2.sqlMessage)
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

    const sclId = req.params.id;
    const mysqlClient = req.app.mysqlClient

    try {
        mysqlClient.query('select * from school where id = ?', [sclId], (err, result) => {
            if (err) {
                console.err(err.sqlMessage)
                return res.status(400).send(err2.sqlMessage)
            } else {
                mysqlClient.query('delete from school where id = ?', [sclId], (err2, result2) => {
                    if (err2) {
                        console.log(err2)
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

