function loadHomePage(req, res) {
    const mysqlClient = req.app.mysqlClient;

    res.render('pages/index.ejs', {name: 'jeeva'})
}

module.exports = (app) => {
    app.get('/', loadHomePage)
}
