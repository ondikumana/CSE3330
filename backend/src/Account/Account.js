module.exports = function (app, client) {
  // account ids will start from 0
  //TODO: revise remove function

  app.get('/fetch_accounts', async (req, res) => {
    // gets all accounts or one account if the account id is provided in the query params

    const account_id = req.query.account_id ? parseInt(req.query.account_id) : null

    try {
      const result = account_id != null ? await client.query(`select * from account where account_id = ${account_id}`) : await client.query(`select * from account`)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
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
      const result = await client.query(`insert into account (account_type) values ('${account.account_type}'); SELECT last_value FROM account_id_seq`)

      res.status(200).send( [ { account_id: parseInt(result[1].rows[0].last_value) } ] )
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
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

      // await client.query(`delete from postview where viewed_by_id = ${account.account_id}`)
      // await client.query(`delete from postlike where liked_by_id = ${account.account_id}`)
      // await client.query(`delete from commentlike where liked_by_id = ${account.account_id}`)
      // await client.query(`delete from comment where author_id = ${account.account_id}`)
      // await client.query(`delete from post where author_id = ${account.account_id}`)
      // await client.query(`delete from message where sender_id = ${account.account_id} or recipient_id = ${account.account_id}`)
      // await client.query(`delete w from member w inner join page p on p.page_id = w.page_id where account_id = ${account.account_id}`)

      let pages = await client.query(`select a.page_id from admin as a, profile as p where p.account_id = ${account.account_id} and a.profile_id = p.profile_id`)
      pages = pages.rows

      console.log('pages', pages)

      pages.forEach(async (page) => {
        // for each page, check if it has more than one admin, otherwise delete it
        try {
          let admins = await client.query(`select * from admin where page_id = ${page.page_id}`)
          admins = admins.rows
          console.log('admins', admins)
          if (admins.length == 1) {
            // delete it
            await client.query(`delete from page where page_id = ${page.page_id}`)
          }
        }
        catch (e) {
          console.log(err.detail)
        }

      })

      // await client.query(`delete w from admin w inner join page p on p.page_id = w.page_id where account_id = ${account.account_id}`)
      // await client.query(`delete from profile where account_id = ${account.account_id}`)
      // await client.query(`delete from page where account_id = ${account.account_id}`)

      const result = await client.query(`delete from account where account_id = ${account.account_id}`)
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
