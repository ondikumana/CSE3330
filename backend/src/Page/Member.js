module.exports = function(app, client) {

  app.get('/fetch_members', async (req, res) =>  {
    // gets all members if the page_id is provided in the query params

    const page_id = req.query.page_id ? parseInt(req.query.page_id) : null

    if (!page_id) {
      res.status(404).send('specify page_id')
      return
    }

    try {
      const result = await client.query(`select * from member where page_id = ${page_id}`)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_member', async (req, res) =>  {
    // creates a member given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const member = {
      page_id: parseInt(req.body.page_id),
      profile_id: req.body.profile_id,
      join_date: req.body.join_date
    }

    //body validation
    if (!member.page_id) {
      res.status(404).send("missing page_id. Make sure it's an int")
      return
    }
    if (!member.profile_id) {
      res.status(404).send("missing profile_id")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into member (page_id, profile_id) values (${member.page_id}, ${member.profile_id})`)
      res.status(200).send(result.rows)
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })

  app.post('/remove_member', async (req, res) =>  {
    // creates a member given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const member = {
      page_id: parseInt(req.body.page_id),
      profile_id: req.body.profile_id,
    }

    //body validation
    if (!member.page_id) {
      res.status(404).send("missing page_id. Make sure it's an int")
      return
    }
    if (!member.profile_id) {
      res.status(404).send("missing profile_id")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`delete from member where page_id = ${member.page_id} and profile_id = ${member.profile_id}`)
      res.status(200).send(result)
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })


}
