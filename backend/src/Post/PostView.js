module.exports = function(app, client) {

  app.get('/fetch_post_views', async (req, res) =>  {
    // gets all members who viewed the post if the post_id is provided in the query params

    const post_id = req.query.post_id ? parseInt(req.query.post_id) : null

    if (!post_id) {
      res.status(404).send('specify post_id')
      return
    }

    try {
      const result = await client.query(`select * from postview where post_id = ${post_id}`)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_post_view', async (req, res) =>  {
    // creates a page like given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const postView = {
      post_id: parseInt(req.body.post_id),
      viewed_by_id: parseInt(req.body.viewed_by_id)
    }

    //body validation
    if (!postView.post_id) {
      res.status(404).send("missing post_id. Make sure it's an int")
      return
    }
    if (!postView.viewed_by_id) {
      res.status(404).send("missing viewed_by_id. Make sure it's an int")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into postview (post_id, viewed_by_id) values (${postView.post_id}, ${postView.viewed_by_id})`)
      res.status(200).send(result.rows)
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })


}
