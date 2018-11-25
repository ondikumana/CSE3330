module.exports = function(app, client) {

  app.get('/fetch_comment_likes', async (req, res) =>  {
    // gets all members who liked the post if the post_id is provided in the query params

    const comment_id = req.query.comment_id ? parseInt(req.query.comment_id) : null

    if (!comment_id) {
      res.status(404).send('specify comment_id')
      return
    }

    try {
      const result = await client.query(`select * from commentlike where comment_id = ${comment_id}`)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_comment_like', async (req, res) =>  {
    // creates a page like given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const commentLike = {
      comment_id: parseInt(req.body.comment_id),
      liked_by_id: parseInt(req.body.liked_by_id)
    }

    //body validation
    if (!commentLike.comment_id) {
      res.status(404).send("missing comment_id. Make sure it's an int")
      return
    }
    if (!commentLike.liked_by_id) {
      res.status(404).send("missing liked_by_id. Make sure it's an int")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into commentlike (comment_id, liked_by_id) values (${commentLike.comment_id}, ${commentLike.liked_by_id})`)
      res.status(200).send(result.rows)
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })

  app.post('/create_comment_like', async (req, res) =>  {
    // removes a comment like given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const commentLike = {
      comment_id: parseInt(req.body.comment_id),
      liked_by_id: parseInt(req.body.liked_by_id)
    }

    //body validation
    if (!commentLike.comment_id) {
      res.status(404).send("missing comment_id. Make sure it's an int")
      return
    }
    if (!commentLike.liked_by_id) {
      res.status(404).send("missing liked_by_id. Make sure it's an int")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`delete from commentlike where comment_id = ${commentLike.comment_id} and liked_by_id = ${commentLike.liked_by_id}`)
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
