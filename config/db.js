const {Pool}=require("pg")
 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Tuteck-ecom-db',
    password: 'root123',
    port:5432,
  
});

module.exports = pool ;