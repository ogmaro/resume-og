const { Prohairesis } = require('prohairesis');

const db_name = process.env.db_name;
const db_pass = process.env.db_pass;
const db_server = process.env.db_server;
const db_port = process.env.db_port;
const mySQLString = `mysql://${db_name}:${db_pass}@${db_server}:${db_port}/${db_name}`;

const db = new Prohairesis(mySQLString);

module.exports = db;
