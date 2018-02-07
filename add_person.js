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

const person = process.argv.slice(2);
const input1 = person[0];
const input2 = person[1];
const input3 = person[2];

// knex.insert({first_name: input1, last_name: input2, birthdate: input3}).into('famous_people');

knex('famous_people').insert({first_name: input1, last_name: input2, birthdate: input3})
.asCallback((err, rows) => {
  if (err) {
    throw err;
  }
});

knex.destroy();