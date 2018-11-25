module.exports = function(app, client) {
  //page ids will start from 100, they'll grow by an interval of 100 and the begining of the number matches the corresponding account_id. ex 1 -> 100, 12 -> 1200


  app.get('/fetch_pages', async (req, res) =>  {
    // gets all accounts or one account if the account id is provided in the query params

    const page_id = req.query.page_id ? parseInt(req.query.page_id) : null
    const account_id = req.query.account_id ? parseInt(req.query.account_id) : null


    try {
      let result
      if (page_id && account_id) {
        result = await client.query(`select * from page where account_id = ${account_id} and page_id = ${page_id}`)
      }
      else if (page_id && !account_id) {
        result = await client.query(`select * from page where page_id = ${page_id}`)
      }
      else if (!page_id && account_id) {
        result = await client.query(`select * from page where account_id = ${account_id}`)
      }
      else {
        result = await client.query(`select * from page`)
      }
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_page', async (req, res) =>  {
    // creates a profile given an object of info in the body. Info validation is to be done from frontend

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const page = {
      page_name: req.body.page_name,
      logo_url: req.body.logo_url,
      header_image_url: req.body.header_image_url,
      description: req.body.description,
      category: parseInt(req.body.category),
      account_id: parseInt(req.body.account_id)
    }

    //body validation
    if (!page.page_name) {
      res.status(404).send("missing page_name")
      return
    }
    // if (!profile.logo_url) {
    //   res.status(404).send("missing logo_url")
    //   return
    // }
    // if (!profile.header_image_url) {
    //   res.status(404).send("missing header_image_url")
    //   return
    // }
    // if (!profile.description) {
    //   res.status(404).send("missing description")
    //   return
    // }
    if (!page.category) {
      res.status(404).send("missing category")
      return
    }
    if (!page.account_id) {
      res.status(404).send("missing account_id. Make sure it's an int")
      return
    }

    //check if account connected to this page is valid
    const account_type = await fetchAccountType(page.account_id, client)

    if (account_type != 'page'){
      res.status(404).send("invalid account. make sure the account is a page")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into page (page_name, logo_url, header_image_url, description, category, account_id) values ('${page.page_name}', '${page.logo_url}', '${page.header_image_url}', '${page.description}', ${page.category}, ${page.account_id}); SELECT last_value FROM page_id_seq`)
      res.status(200).send( [ { page_id: parseInt(result[1].rows[0].last_value) } ] )
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
      return
    }

  })

  app.post('/update_page', async (req, res) =>  {
    // creates a profile given an object of info in the body. Info validation is to be done from frontend

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const page = {
      page_id: req.body.page_id,
      page_name: req.body.page_name,
      logo_url: req.body.logo_url,
      header_image_url: req.body.header_image_url,
      description: req.body.description,
      category: parseInt(req.body.category),
    }

    if (!page.page_id) {
      res.status(404).send("missing page_id")
      return
    }

    //adding data to database
    try {

      let result

      if (page.page_name) {
        await client.query(`update page set page_name = '${page.page_name}' where page_id = ${page.page_id}`)
      }
      if (page.logo_url) {
        await client.query(`update page set logo_url = '${page.logo_url}' where page_id = ${page.page_id}`)
      }
      if (page.header_image_url) {
        await client.query(`update page set header_image_url = '${page.header_image_url}' where page_id = ${page.page_id}`)
      }
      if (page.description) {
        await client.query(`update page set description = '${page.description}' where page_id = ${page.page_id}`)
      }
      if (page.category) {
        await client.query(`update page set category = ${page.category} where page_id = ${page.page_id}`)
      }

      res.status(200).send('done')
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(400).send(err)
      return
    }

  })

}

async function fetchAccountType(account_id, client) {

  try {
    const result = await client.query(`select account_type from account where account_id = ${account_id}`)
    // console.log(result.rows[0].account_type)
    return result.rows[0].account_type
  }
  catch (err) {
    console.log(err.detail)
    return null
  }

}
