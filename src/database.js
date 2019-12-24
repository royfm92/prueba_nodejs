const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fulmil',
    database: 'prueba_nodejs'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
    }else{
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;