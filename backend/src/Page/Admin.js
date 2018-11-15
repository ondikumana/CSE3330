module.exports = function(app, sql) {

  app.get('/fetch_admins', async (req, res) =>  {
    // gets all admins if the page_id is provided in the query params

    const page_id = req.query.page_id ? parseInt(req.query.page_id) : null

    if (!page_id) {
      res.status(404).send('specify page_id')
    }

    try {
      const result = await sql.query`select * from admin where page_id = ${page_id}`
      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }

  })

  app.post('/create_admin', async (req, res) =>  {
    // creates an admin given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const admin = {
      page_id: parseInt(req.body.page_id),
      profile_id: req.body.profile_id,
    }

    //body validation
    if (!admin.page_id) {
      res.status(404).send("missing page_id. Make sure it's an int")
      return
    }
    if (!admin.profile_id) {
      res.status(404).send("missing profile_id")
      return
    }

    //adding data to database
    try {
      const result = await sql.query`insert into admin (page_id, profile_id, admin_since_date) values (${admin.page_id}, ${admin.profile_id}, DEFAULT)`
      res.status(200).send(result)
      return
    }
    catch (err) {
      console.log(err.originalError.info.message)
      res.status(404).send(err.originalError.info.message)
      return
    }

  })


}
