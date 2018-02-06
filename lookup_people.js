const pg = require('pg');
const {Client} = require('pg');
const settings = require('./settings');

const client = new Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.host,
  port: settings.port,
  ssl: settings.ssl
});

let value = 'SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text'
let input = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query(value, input, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    // Count Function
    console.log('Found ' + result.rowCount + ' person(s) by the name ' + input);
    // Indepedent search print
    for (const list of result.rows) {
      console.log("- " + list.id + ": " + list.first_name + " " + list.last_name + ", born " +"'" + list.birthdate.getFullYear() + "-" + ("0" + (list.birthdate.getMonth() + 1)).slice(-2) +"-"+ ("0" + (list.birthdate.getDate())).slice(-2) + "'");
    }
    client.end();
  });
  console.log("Searching...");
});