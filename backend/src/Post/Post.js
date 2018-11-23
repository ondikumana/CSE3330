module.exports = function(app, sql) {
  //post ids will start from 3000 increment by 1

  app.get('/fetch_posts', async (req, res) =>  {
    // gets all accounts or one account if the author id or destination id is provided in the query params

    const author_id = req.query.author_id ? parseInt(req.query.author_id) : null
    const destination_id = req.query.destination_id ? parseInt(req.query.destination_id) : null

    try {
      let result 

      if (author_id && destination_id) {
        result = await sql.query`select * from post where author_id = ${author_id} and destination_id = ${destination_id}` 
      } 
      else if (author_id && !destination_id) {
        result = await sql.query`select * from post where author_id = ${author_id}` 
      }
      else if (!author_id && destination_id) {
        result = await sql.query`select * from post where destination_id = ${destination_id}`
      }
      else {
        result = await sql.query`select * from post`
      }
      
      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }

  })

  app.post('/create_post', async (req, res) =>  {
    // creates a profile given an object of info in the body. Info validation is to be done from frontend

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const post = {
      author_id: parseInt(req.body.author_id),
      destination_id: parseInt(req.body.destination_id),
      attachment_url: req.body.attachment_url,
      body: req.body.body
    }

    //body validation
    if (!post.author_id) {
      res.status(404).send("missing author_id. Make sure it's an int")
      return
    }
    if (!post.body) {
      res.status(404).send("missing body")
      return
    }

    // if post has no destination.... send it to the author
    if (!post.destination_id) {
      post.destination_id = post.author_id
    }

    //adding data to database
    try {
      const result = await sql.query`insert into post (time, author_id, destination_id, body, attachment_url) VALUES(DEFAULT, ${post.author_id}, ${post.destination_id}, ${post.body}, ${post.attachment_url}); select scope_identity() as post_id`
      res.status(200).send(result.recordset)
      return
    }
    catch (err) {
      console.log(err.originalError.info.message)
      res.status(404).send(err.originalError.info.message)
      return
    }

  })

}
