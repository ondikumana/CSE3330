module.exports = function(app, client) {

  app.get('/fetch_page_views', async (req, res) =>  {
    // gets all members who viewd the page if the page_id is provided in the query params

    const page_id = req.query.page_id ? parseInt(req.query.page_id) : null

    if (!page_id) {
      res.status(404).send('specify page_id')
      return
    }

    try {
      const result = await client.query(`select * from pageview where page_id = ${page_id}`)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_page_view', async (req, res) =>  {
    // creates a page view given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const pageView = {
      page_id: parseInt(req.body.page_id),
      profile_id: req.body.profile_id,
    }

    //body validation
    if (!pageView.page_id) {
      res.status(404).send("missing page_id. Make sure it's an int")
      return
    }
    if (!pageView.profile_id) {
      res.status(404).send("missing profile_id")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into pageview (page_id, profile_id) values (${pageView.page_id}, ${pageView.profile_id})`)
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
