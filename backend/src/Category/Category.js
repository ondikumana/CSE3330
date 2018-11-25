module.exports = function (app, client) {

    app.get('/fetch_categories', async (req, res) => {
      // gets all category description or all categories
  
      const category_id = req.query.category_id ? parseInt(req.query.category_id) : null

      try {
        let result 
        if (category_id) {
            result = await client.query(`select * from category where category_id = ${category_id}`)
        }
        else {
            result = await client.query(`select * from category`)
        }

        res.status(200).send(result.rows)
      }
      catch (err) {
        console.log(err.detail)
        res.status(404).send(err)
      }
  
    })
  
    app.post('/create_category', async (req, res) => {
      // creates a page like given an object of info in the body
  
      if (!req.body) {
        res.status(404).send("missing body")
        return
      }
  
      const category = {
        category_description: req.body.category_description
      }
  
      //body validation
      if (!category.category_description) {
        res.status(404).send("missing category_description")
        return
      }
  
      //adding data to database
      try {
        const result = await client.query(`insert into category (category_description) values ('${category.category_description}'); SELECT last_value FROM category_id_seq`)
        res.status(200).send( [ { category_id: parseInt(result[1].rows[0].last_value) } ] )
        return
      }
      catch (err) {
        console.log(err.detail)
        res.status(404).send(err)
        return
      }
  
    })
  
    app.post('/remove_category', async (req, res) => {
      // removes a post like given an object of info in the body
  
      if (!req.body) {
        res.status(404).send("missing body")
        return
      }
  
      const category = {
        category_id: req.body.category_id
      }
  
      //body validation
      if (!category.category_id) {
        res.status(404).send("missing category_id")
        return
      }
  
      //adding data to database
      try {
        const result = await client.query(`delete from category where category_id = ${category.category_id}`)
        res.status(200).send(result)
        return
      }
      catch (err) {
        console.log(err.detail)
        res.status(404).send(err)
        return
      }
  
    })
  
  
  }
  