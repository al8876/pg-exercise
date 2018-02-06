const pg = require('pg');
const {Client} = require('pg');
const settings = require('./settings');

function performQuery(query, terms, callback) {
  const client = new Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.host,
    port: settings.port,
    ssl: settings.ssl
  });

  client.connect((error) => {
    if (error) {
      return console.error('Connection Error', err);
    }

      client.query(query, terms, (err,res) => {
        if (err) {
          return console.error('error running query', err);
        }
        callback(res.rows);
        console.log("Searching...");
        console.log(result.rows);

        client.end();
      });
  });
  console.log('test2');
}

function getFamousPeople(searchTerm, callback) {
  const query = `SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text ORDER BY first_name`

  const terms = process.argv.slice(2);

  performQuery(query, terms, callback);

}

// // let value = 'SELECT COUNT(id) FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text GROUP BY first_name'
// let value = 'SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text'

// client.connect((err) => {
//   if (err) {
//     return console.error('Connection Error', err);
//   }
//   client.query(value, input, (err, result) => {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log("Searching...");
//     // console.log("Found " + [${value}] + "person(s) by the name " + input);
//     console.log(result.rows);
//     client.end();
//   });
// });