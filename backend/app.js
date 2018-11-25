// container id 6120d3809a1b

var express = require('express')
var path = require('path')
const async = require("async")
const bodyParser = require('body-parser')
const cors = require('cors')

var app = express()

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: '104.154.170.103',
  database: 'master',
  password: 'okn0973',
  port: 5432,
})
client.connect()

cors({credentials: true, origin: true})
app.use(cors())


// to read body parser required
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes in different files

require('./src/Account/Account')(app, client)

require('./src/Profile/Profile')(app, client)

require('./src/Page/Page')(app, client)
require('./src/Page/Member')(app, client)
require('./src/Page/PageView')(app, client)
require('./src/Page/Admin')(app, client)

require('./src/Message/Message')(app, client)

require('./src/Post/Post')(app, client)
require('./src/Post/PostLike')(app, client)
require('./src/Post/PostView')(app, client)

require('./src/Comment/Comment')(app, client)
require('./src/Comment/CommentLike')(app, client)

require('./src/Category/Category')(app, client)


const server = app.listen(process.env.PORT || 8080, () => console.log('\nCSE3330 listening on port %s\nPress Ctrl-C to quit...\n', server.address().port) );

