module.exports = function(app, sql) {
  // account ids will start from 0

  app.get('/fetch_accounts', async (req, res) =>  {
    // gets all accounts or one account if the account id is provided in the query params

    const account_id = req.query.account_id ? parseInt(req.query.account_id) : null

    try {
      const result = account_id != null ? await sql.query`select * from account where account_id = ${account_id}` : await sql.query`select * from account`
      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }

  })

  app.post('/create_account', async (req, res) =>  {
    // creates an account given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }


    const account = {
      account_id: parseInt(req.body.account_id),
      creation_date: req.body.creation_date,
      account_type: req.body.account_type
    }

    //body validation
    if (!account.account_id) {
      res.status(404).send("missing account id. Make sure it's an int")
      return
    }
    if (!account.creation_date) {
      res.status(404).send("missing creation date")
      return
    }
    if (!account.account_type) {
      res.status(404).send("missing account type")
      return
    }

    //creation date validation
    const creationDateArr = account.creation_date.split("-")

    if (creationDateArr.length != 3) {
      res.status(404).send("invalid date")
      return
    }
    if (creationDateArr[0].length != 4 || creationDateArr[1].length != 2){
      res.status(404).send("invalid date")
      return
    }

    //account_type validation
    if (account.account_type.length > 7 || (account.account_type != 'page' && account.account_type != 'profile')){
      res.status(404).send("invalid account_type")
      return
    }

    //adding data to database
    try {
      const result = await sql.query`insert into account (account_id, creation_date, account_type) values (${account.account_id}, ${account.creation_date}, ${account.account_type})`
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
