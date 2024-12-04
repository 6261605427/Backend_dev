const mysql = require('mysql2')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'user'
})

connection.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)
    }
    console.log('database connected')
})

module.exports = connection


// https://github.com/kkishantc/practical-backend.git