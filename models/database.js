console.log(". result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]result.rows[0]")
const pg = require('pg')  
const conString = 'postgres://postgres:teste@localhost/db_pauliceia' // make sure to match your own database's credentials

pg.connect(conString, function (err, client, done) {  
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('select * from tb_street', ['db_pauliceia'], function (err, result) {
    done()

    if (err) {
      return console.error('error happened during query', err)
    }
    console.log(result.rows[0])
    process.exit(0)
  })
})