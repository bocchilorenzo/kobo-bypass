const readline = require('readline-sync');
const process = require('process');

let dbPath = ""
do {
    dbPath = readline.question("Insert your Kobo's path: ");
    dbPath == "" ? console.log("Path can't be empty\n") : null;
} while (dbPath == "")
let UserDisplayName = readline.question("Insert your display name (leave empty to set 'foo'): ");
let UserEmail = readline.question("Insert an email (leave empty to set 'foo@bar.com'): ");

dbPath = dbPath.replace(/\\/g, "/");
dbPath.charAt(dbPath.length - 1) == "/" ? dbPath = dbPath.substring(0, dbPath.length - 1) : null;
UserDisplayName == "" ? UserDisplayName = "foo" : null;
UserEmail == "" ? UserEmail = "foo@bar.com" : null;

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath + '/.kobo/KoboReader.sqlite'
    },
    useNullAsDefault: true
});

knex('USER')
    .insert({
        UserID: Date.now().toString(),
        UserKey: "1234",
        UserDisplayName: UserDisplayName,
        UserEmail: UserEmail
    })
    .then(() => {
        console.log("Done! You can now unmount and unplug your Kobo")
        process.exitCode = 0;
    }).catch(err => {
        console.log(`Error! + ${err}`)
        process.exitCode = 1;
    }).then(() => {
        process.exit();
    });