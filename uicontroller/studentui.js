function loadStudentPage(req, res) {
    const mysqlClient = req.app.mysqlClient;
    try {
        mysqlClient.query(`SELECT
	                        s.*,
                            c.courseName,
                            DATE_FORMAT(dob, "%m/%d/%Y") as DOB,
                            s1.name as tenthSchool,
                            s2.name as twelfthSchool,
                            DATE_FORMAT(s.createAt, "%m/%d/%Y %T") as createAt  
                            FROM student as s
                            inner join course as c ON c.id = s.courseId
                            inner join school as s1 ON s1.id = s.schoolTenthId
                            inner join school as s2 ON s2.id = s.schoolTwelfthId`, (err, result) => {
            if (err) {
                res.status(404).send(err.sqlMessage)
            } else {
                res.render('pages/student/studentlist.ejs', { result })
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function loadAddStudent(req, res){
    res.render('pages/student/addstudent.ejs', {studentId: ''})
}


function editStudent(req, res){
    const studentId = req.params.id
    res.render('pages/student/addstudent.ejs', { studentId: studentId })
}

function deleteStudent(req, res){
    const studentId = req.params.id
    res.render('pages/student/addstudent.ejs', { studentId: studentId })
}

module.exports = (app) => {
    app.get('/student', loadStudentPage)
    app.get('/student/add', loadAddStudent)
    app.get('/student/:id', editStudent)
    app.get('/delete?student/:id', deleteStudent)
}

