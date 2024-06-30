function loadSchoolPage(req, res) {
    res.render('pages/school/schoollist.ejs')
}
function loadAddStudent(req, res) {
    res.render('pages/school/schoolform.ejs', { schoolId: '' })
}

function loadEditStudent(req, res) {
    const schoolId = req.params.id;
    res.render('pages/school/schoolform.ejs', { schoolId: schoolId })
}

module.exports = (app) => {
    app.get('/school', loadSchoolPage)
    app.get('/school/add', loadAddStudent)
    app.get('/school/:id', loadEditStudent)
}