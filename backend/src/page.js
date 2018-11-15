module.exports = function(app, sql) {
  //page ids will start from 100, they'll grow by an interval of 100 and the begining of the number matches the corresponding account_id. ex 1 -> 100, 12 -> 1200


  app.get('/fetch_pages', async (req, res) =>  {
    // gets all accounts or one account if the account id is provided in the query params

    const page_id = req.query.page_id ? parseInt(req.query.page_id) : null


    try {
      const result = page_id != null ? await sql.query`select * from profile where page = ${page_id}` : await sql.query`select * from page`
      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
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
      page_id: parseInt(req.body.page_id),
      page_name: req.body.page_name,
      logo_url: req.body.logo_url,
      header_image_url: req.body.header_image_url,
      description: req.body.description,
      category: parseInt(req.body.category),
      account_id: parseInt(req.body.account_id)
    }

    //body validation
    if (!page.page_id) {
      res.status(404).send("missing page_id. Make sure it's an int")
      return
    }
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

    //adding data to database
    try {
      const result = await sql.query`insert into page (page_id, page_name, logo_url, header_image_url, description, category, account_id) values (${page.page_id}, ${page.page_name}, ${page.logo_url}, ${page.header_image_url}, ${page.description}, ${page.category}, ${page.account_id})`
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
