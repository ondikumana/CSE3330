module.exports = function(app, sql) {
  //profile ids will start from 1000, they'll grow by an interval of 1000 and the begining of the number matches the corresponding account_id. ex 1 -> 1000, 12 -> 12000

  app.get('/fetch_messages', async (req, res) =>  {
    // gets all accounts or one account if the account id is provided in the query params

    const recipient_id = req.query.recipient_id ? parseInt(req.query.recipient_id) : null
    const sender_id = req.query.sender_id ? parseInt(req.query.sender_id) : null

    if (!recipient_id && !sender_id) {
      res.status(404).send("missing both sender_id and recipient_id is required")
      return
    }

    try {
      let result

      if (recipient_id && sender_id){
        result = await sql.query`select * from message where recipient_id = ${recipient_id} and sender_id = ${sender_id}`
      }
      else if (recipient_id && !sender_id) {
        result = await sql.query`select * from message where recipient_id = ${recipient_id}`
      }
      else if (!recipient_id && sender_id) {
        result = await sql.query`select * from message where sender_id = ${sender_id}`
      }

      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }

  })

  app.post('/create_message', async (req, res) =>  {
    // creates a profile given an object of info in the body. Info validation is to be done from frontend

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const message = {
      sender_id: parseInt(req.body.sender_id),
      recipient_id: parseInt(req.body.recipient_id),
      body: req.body.body
    }

    //body validation
    if (!message.sender_id) {
      res.status(404).send("missing sender_id. Make sure it's an int")
      return
    }
    if (!message.recipient_id) {
      res.status(404).send("missing recipient_id")
      return
    }
    if (!message.body) {
      res.status(404).send("missing body")
      return
    }

    //adding data to database
    try {
      const result = await sql.query`insert into message (recipient_id, sender_id, sent_time, sent, delivered, message_read, body) values (${message.recipient_id}, ${message.sender_id}, DEFAULT, 1, 0, 0, ${message.body})`
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
