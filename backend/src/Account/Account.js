module.exports = function (app, sql) {
  // account ids will start from 0

  app.get('/fetch_accounts', async (req, res) => {
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

  app.post('/create_account', async (req, res) => {
    // creates an account given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }


    const account = {
      account_type: req.body.account_type
    }

    //body validation
    if (!account.account_type) {
      res.status(404).send("missing account type")
      return
    }

    //account_type validation
    if (account.account_type.length > 7 || (account.account_type != 'page' && account.account_type != 'profile')) {
      res.status(404).send("invalid account_type")
      return
    }

    //adding data to database
    try {
      const result = await sql.query`insert into account (creation_date, account_type) values (DEFAULT, ${account.account_type}); select scope_identity() as account_id`
      res.status(200).send(result.recordset)
      return
    }
    catch (err) {
      console.log(err.originalError.info.message)
      res.status(404).send(err.originalError.info.message)
      return
    }

  })

  app.post('/remove_account', async (req, res) => {
    // creates an account given an object of info in the body

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }


    const account = {
      account_id: req.body.account_id
    }

    //body validation
    if (!account.account_id) {
      res.status(404).send("missing account_id")
      return
    }

    //adding data to database
    try {

      await sql.query`delete from postview where viewed_by_id = ${account.account_id}`
      await sql.query`delete from postlike where liked_by_id = ${account.account_id}`
      await sql.query`delete from commentlike where liked_by_id = ${account.account_id}`
      await sql.query`delete from comment where author_id = ${account.account_id}`
      await sql.query`delete from post where author_id = ${account.account_id}`
      await sql.query`delete from message where sender_id = ${account.account_id} or recipient_id = ${account.account_id}`
      await sql.query`delete w from member w inner join page p on p.page_id = w.page_id where account_id = ${account.account_id}`

      let pages = await sql.query`select a.page_id from admin as a, profile as p where p.account_id = ${account.account_id}`
      pages = pages.recordset

      console.log(pages)

      pages.forEach(async (page) => {
        // for each page, check if it has more than one admin, otherwise delete it
        try {
          let admins = await sql.query`select * from admin where page_id = ${page.page_id}`
          admins = admins.recordset
          console.log(admins)
          if (admins.length == 1) {
            // delete it
            await sql.query`delete from page where page_id = ${page.page_id}`
          }
        }
        catch (e) {
          console.log(e)
        }

      })

      await sql.query`delete w from admin w inner join page p on p.page_id = w.page_id where account_id = ${account.account_id}`
      await sql.query`delete from profile where account_id = ${account.account_id}`
      await sql.query`delete from page where account_id = ${account.account_id}`

      const result = await sql.query`delete from account where account_id = ${account.account_id}`
      res.status(200).send(result.recordset)
      return
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err.originalError.info.message)
      return
    }

  })


}
