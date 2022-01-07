const mysql = require("mysql");
const Promise = require("bluebird");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "whatsapp",
};

async function connectionCheck() {
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    console.log("connection succcesfull");
    await connection.endAsync();
}

async function sendMessage(user) {
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    await connection.queryAysnc(`insert into user(userID,chat) values(?,?)`, [
        user.userID,
        user.chat,
    ]);
    await connection.endAsync();
}

async function showMessage(chatapp) {
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    const list = await connection.queryAysnc(`select * from user`, []);
    // console.log(list);
    await connection.endAsync();

    return list;
}

showMessage();

module.exports = { sendMessage, showMessage };