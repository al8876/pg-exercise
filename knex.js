const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

let input = process.argv.slice(2);

function showPeople(result) {
  for (const list of result) {
    console.log("- " + list.id + ": " + list.first_name + " " + list.last_name + ", born " +"'" + list.birthdate.getFullYear() + "-" + ("0" + (list.birthdate.getMonth() + 1)).slice(-2) +"-"+ ("0" + (list.birthdate.getDate())).slice(-2) + "'");
  }
}

function count(result) {
  console.log('Found ' + result.length + ' person(s) by the name ' + input);  
}

knex.select('*').from('famous_people')
.where('first_name', 'LIKE', `${input}`)
.orWhere('last_name', 'LIKE', `${input}`)
.asCallback(function(err, rows){
  if (err) {
    throw err;
  }
  console.log("Searching...");
  count(rows);
  showPeople(rows);
});

knex.destroy();