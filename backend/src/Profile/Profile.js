module.exports = function(app, client) {
  //profile ids will start from 1000, they'll grow by an interval of 1000 and the begining of the number matches the corresponding account_id. ex 1 -> 1000, 12 -> 12000

  app.get('/fetch_profiles', async (req, res) =>  {
    // gets all accounts or one account if the account id is provided in the query params

    const account_id = req.query.account_id ? parseInt(req.query.account_id) : null
    const profile_id = req.query.profile_id ? parseInt(req.query.profile_id) : null
    const email = req.query.email ? req.query.email : null
    const username = req.query.username ? req.query.username : null

    try {
      let result

      if (account_id){
        result = await client.query(`select * from profile where account_id = ${account_id}`)
      }
      else if (profile_id){
        result = await client.query(`select * from profile where profile_id = ${profile_id}`)
      }
      else if (email) {
        result = await client.query(`select * from profile where email = '${email}'`)
      }
      else if (username) {
        result = await client.query(`select * from profile where username = '${username}'`)
      }
      else {
        result = await await client.query(`select * from profile`)
      }

      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
    }

  })

  app.post('/create_profile', async (req, res) =>  {
    // creates a profile given an object of info in the body. Info validation is to be done from frontend

    if (!req.body) {
      res.status(404).send("missing body")
      return
    }

    const profile = {
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      account_id: parseInt(req.body.account_id)
    }

    //body validation
    if (!profile.fname) {
      res.status(404).send("missing fname")
      return
    }
    if (!profile.lname) {
      res.status(404).send("missing lname")
      return
    }
    if (!profile.phone) {
      res.status(404).send("missing phone")
      return
    }
    if (!profile.username) {
      res.status(404).send("missing username")
      return
    }
    if (!profile.password) {
      res.status(404).send("missing password")
      return
    }
    if (!profile.account_id) {
      res.status(404).send("missing account_id. Make sure it's an int")
      return
    }

    //check if account connected to this profile is valid
    const account_type = await fetchAccountType(profile.account_id, client)

    if (account_type != 'profile'){
      res.status(404).send("invalid account. make sure the account is a profile")
      return
    }

    //adding data to database
    try {
      const result = await client.query(`insert into profile (fname, lname, phone, email, username, password, account_id) values ('${profile.fname}', '${profile.lname}', '${profile.phone}', '${profile.email}', '${profile.username}', '${profile.password}', ${profile.account_id}); SELECT last_value FROM profile_id_seq`)
      res.status(200).send( [ { profile_id: parseInt(result[1].rows[0].last_value) } ] )
      return
    }
    catch (err) {
      console.log(err.detail)
      res.status(404).send(err)
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
