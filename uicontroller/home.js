function loadHomePage(req, res) {
    const mysqlClient = req.app.mysqlClient;
    try {
        mysqlClient.query('SELECT COUNT(*) as totalStudent FROM student', (err, result) => {
            if (err) {
                res.status(400).send(err.sqlMessage)
            } else {
                mysqlClient.query('SELECT COUNT(*) as totalCourse FROM course', (err2, result2) => {
                    if (err2) {
                        res.status(400).send(err2.sqlMessage)
                    } else {
                        mysqlClient.query('SELECT count(*) as totalSchool FROM school', (err3, result3) => {
                            if (err3) {
                                res.status(400).send(err3.sqlMessage)
                            } else {
                                res.render('pages/index.ejs', {
                                    totalStudent: result[0].totalStudent,
                                    totalCourse: result2[0].totalCourse,
                                    totalSchool: result3[0].totalSchool
                                })
                            }
                        })
                    }

                })
            }
        
        })
    }catch (error) {
            res.status(400).send(error.message)
        }
    }

    module.exports = (app) => {
        app.get('/', loadHomePage)
    }
