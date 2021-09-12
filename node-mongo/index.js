const MongoClient = require('mongodb').MongoClient; // client for mongo server
const dboper = require('./operations'); // imports the methods we created to interact with database

const url = 'mongodb://localhost:27017/'; // url where mongodb server can be accessed with port number
const dbname = 'nucampsite'; // name of db to connect to

// connect method allows us to connect mongo client to mongodb server
// url from above, object that sets various options, later versions dont require this topology object
// then callback function with two params err and client connect to db
// .then client if promise returns and then .catch at bottom to catch errors
MongoClient.connect(url, {useUnifiedTopology: true}).then(client => {

  console.log('Connected correctly to server');

// connects us to nucampsite db as db to interact with database
  const db = client.db(dbname);

// deletes everything in database
// 1st arg is collection

  db.dropCollection('campsites') // not typical operation just for training
  .then(result => {
    console.log('Dropped Collection:', result);
  })
  .catch(err => console.log('No collection to drop.'));

  dboper.insertDocument(db, {name:"Breadcrumb Trail Campground", description: "Test"}, 'campsites')
  // promises mitigate callback hell
  .then(result => {
    console.log('Insert Document:', result.ops);

    return dboper.findDocuments(db, 'campsites');
  })
  .then(docs => {
    console.log('Found Documents:', docs);

    return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites');
  })
  .then(result => {
    console.log('Updated Document Count:', result.result.nModified);

    return dboper.findDocuments(db, 'campsites'); 
  })
  .then(docs => {
    console.log('Found Documents:', docs);

    return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites');
  })
  .then(result => {
    console.log('Deleted Document Count:', result.deletedCount);

    return client.close();
  })
  // catch any errors from returned promises
  .catch(err => {
    console.log(err);
    //closes the connection to db
    client.close();
  });
})
//catch mongoclient err in connection
.catch(err => console.log(err));
