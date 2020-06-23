
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'ApiAssessment',
    multipleStatements: true,
});

mysqlConnection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('connected');
    }
});

module.exports = mysqlConnection;