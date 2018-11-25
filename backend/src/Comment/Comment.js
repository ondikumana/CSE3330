module.exports = function(app, client) {
  //profile ids will start from 1000, they'll grow by an interval of 1000 and the begining of the number matches the corresponding account_id. ex 1 -> 1000, 12 -> 12000

  app.get('/fetch_comments', async (req, res) =>  {
    // gets all comments if the post_id is provided in the query params

    const post_id = req.query.post_id ? parseInt(req.query.post_id) : null

    try {
      let result

      if (post_id) {
        result = await client.query(`select * from comment where post_id = ${post_id}`)
      }
      else {
        result = await client.query(`select * from comment`)
      }

      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })


  app.post('/create_comment', async (req, res) =>  {
    // creates a comment given an object of info in the body. Info validation is to be done from frontend

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const comment = {
      post_id: parseInt(req.body.post_id),
      author_id: parseInt(req.body.author_id),
      attachment_url: req.body.attachment_url,
      body: req.body.body
    }

    //body validation
    if (!comment.post_id) {
      res.status(404).send("missing post_id. Make sure it's an int")
      return
    }
    if (!comment.author_id) {
      res.status(404).send("missing author_id")
      return
    }
    if (!comment.body) {
      res.status(404).send("missing body")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into comment (author_id, post_id, body) values (${comment.author_id}, ${comment.post_id}, '${comment.body}'); SELECT last_value FROM comment_id_seq`)
      res.status(200).send( [ { comment_id: parseInt(result[1].rows[0].last_value) } ] )
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })

}
