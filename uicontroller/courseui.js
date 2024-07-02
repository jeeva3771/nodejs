function loadCoursePage(req, res) {
    const mysqlClient = req.app.mysqlClient;
    try {
        mysqlClient.query(`select
            cour.*,
            DATE_FORMAT(createAt, "%m-%d-%Y %T") as createAt
            from course as cour`, (err, result) => {
            if (err) {
                res.status(404).send(err.sqlMessage)
            } else {
                res.render('pages/course/courselist.ejs', { result })
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function loadAddCourse(req, res) {
    res.render('pages/course/courseform.ejs', { courseId: '' })
}

function loadEditStudent(req, res) {
    const courseId = req.params.id;
    res.render('pages/course/courseform.ejs', { courseId: courseId })
}
module.exports = (app) => {
    app.get('/course', loadCoursePage)
    app.get('/course/add', loadAddCourse)
    app.get('/course/:id', loadEditStudent)

}