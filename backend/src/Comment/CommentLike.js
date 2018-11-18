module.exports = function(app, sql) {

  app.get('/fetch_comment_likes', async (req, res) =>  {
    // gets all members who liked the post if the post_id is provided in the query params

    const comment_id = req.query.comment_id ? parseInt(req.query.comment_id) : null

    if (!comment_id) {
      res.status(404).send('specify comment_id')
      return
    }

    try {
      const result = await sql.query`select * from commentlike where comment_id = ${comment_id}`
      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
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
      const result = await sql.query`insert into commentlike (comment_id, liked_by_id, time) values (${commentLike.comment_id}, ${commentLike.liked_by_id}, DEFAULT)`
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
