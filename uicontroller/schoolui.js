function loadSchoolPage(req, res) {
    const mysqlClient = req.app.mysqlClient;
    try {
        mysqlClient.query('select * from school', (err, result) => {
            if (err) {
                return res.status(404).send(err.sqlMessage)
            } else {
                res.status(200).render('pages/school/schoollist.ejs', { result })
            }
        })
    } catch (error) {
        console.error(error)
    }
}
 function loadAddStudent(req, res){
    res.render('pages/school/addschool.ejs',{schoolId: ''})
 }

 function loadEditStudent(req, res){
    const schoolId = req.params.Id;
    res.render('pages/school/addschool.ejs',{schoolId: schoolId})
 }

module.exports = (app) => {
    app.get('/school', loadSchoolPage)
    app.get('/school/add', loadAddStudent)
    app.get('/school/:id', loadEditStudent)
}