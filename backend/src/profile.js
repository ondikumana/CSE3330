module.exports = function(app, sql) {
  //profile ids will start from 1000, they'll grow by an interval of 1000 and the begining of the number matches the corresponding account_id. ex 1 -> 1000, 12 -> 12000

  app.get('/fetch_profiles', async (req, res) =>  {
    // gets all accounts or one account if the account id is provided in the query params

    const profile_id = req.query.profile_id ? parseInt(req.query.profile_id) : null


    try {
      const result = profile_id != null ? await sql.query`select * from profile where profile_id = ${profile_id}` : await sql.query`select * from profile`
      res.status(200).send(result.recordset)
    }
    catch (err) {
      console.log(err)
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
      profile_id: parseInt(req.body.profile_id),
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      account_id: parseInt(req.body.account_id)
    }

    //body validation
    if (!profile.profile_id) {
      res.status(404).send("missing profile_id. Make sure it's an int")
      return
    }
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
    const account_type = await fetchAccountType(profile.account_id, sql)

    if (account_type != 'profile'){
      res.status(404).send("invalid account. make sure the account is a profile")
      return
    }

    //adding data to database
    try {
      const result = await sql.query`insert into profile (profile_id, fname, lname, phone, email, username, password, account_id) values (${profile.profile_id}, ${profile.fname}, ${profile.lname}, ${profile.phone}, ${profile.email}, ${profile.username}, ${profile.password}, ${profile.account_id})`
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


async function fetchAccountType(account_id, sql) {

  try {
    const result = await sql.query`select account_type from account where account_id = ${account_id}`
    // console.log(result.recordset[0].account_type)
    return result.recordset[0].account_type
  }
  catch (err) {
    console.log(err)
    return null
  }

}
