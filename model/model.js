
const Client = require('pg').Client;
const client = new Client({
  user: 'maadmin',
  password: 'VeryG00dPa$$word',
  host: 'localhost',
  port: 5432,
  database: 'maadmin'
})

client.connect()
.then(() => console.log('Connected to db successfully'))
.catch(e => console.log(e));

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

module.exports.createAccount = function createAdmin(username, password, respond){
    var sql = "INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *";
    client.query(sql, [username, password]).then(result => {
        //If the rows are empty, then that means that this admin does not currently organize a league. 
        if (result.rows[0] == null){
            console.log("This admin was not created.");
            if (isFunction(respond)) respond({success: false});
            return;
        }
        if (isFunction(respond)) respond({success: true});
        return;
    }).catch(e => {
        console.log("\nADMIN CREATION ERROR!\n");
        console.log(e);
        if (isFunction(respond)) respond({success: false});
        return e;
    })
}

module.exports.login = login(username, password, respond){
    var sql = 'SELECT password FROM admin WHERE username=$1;';
    client.query(sql, [username]).then(result => {
        var login = {
        success: false
        }
        if (result.rows[0] == null){
            console.log("Username does not exist.");
            if (isFunction(respond)) respond(login);
            return;
        }
        var correctPass = result.rows[0].password;
        if (password === correctPass){
            login.success = true
            this.name = username;
            console.log("Password correct.");
            if (isFunction(respond)) respond(login);
            return;
        }
        console.log("Password incorrect.");
        if (isFunction(respond)) respond(login);
        return;
    }).catch(e => {
        console.log("\nLOGIN ERROR!\n");
        console.log(e);
        return e;
    })
}