module.exports = function (app, client) {

  app.get('/fetch_post_likes', async (req, res) => {
    // gets all members who liked the post if the post_id is provided in the query params

    const post_id = req.query.post_id ? parseInt(req.query.post_id) : null

    if (!post_id) {
      res.status(404).send('specify post_id')
      return
    }

    try {
      const result = await client.query(`select * from postlike where post_id = ${post_id}`)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_post_like', async (req, res) => {
    // creates a page like given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const postLike = {
      post_id: parseInt(req.body.post_id),
      liked_by_id: parseInt(req.body.liked_by_id)
    }

    //body validation
    if (!postLike.post_id) {
      res.status(404).send("missing post_id. Make sure it's an int")
      return
    }
    if (!postLike.liked_by_id) {
      res.status(404).send("missing liked_by_id. Make sure it's an int")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into postlike (post_id, liked_by_id) values (${postLike.post_id}, ${postLike.liked_by_id})`)
      res.status(200).send(result.rows)
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })

  app.post('/remove_post_like', async (req, res) => {
    // removes a post like given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const postLike = {
      post_id: parseInt(req.body.post_id),
      liked_by_id: parseInt(req.body.liked_by_id)
    }

    //body validation
    if (!postLike.post_id) {
      res.status(404).send("missing post_id. Make sure it's an int")
      return
    }
    if (!postLike.liked_by_id) {
      res.status(404).send("missing liked_by_id. Make sure it's an int")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`delete from postlike where post_id = ${postLike.post_id} and liked_by_id = ${postLike.liked_by_id}`)
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
