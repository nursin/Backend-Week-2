// methods for working with database
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  // node driver method insertOne returns a promise if callback not specified
  return coll.insertOne(document);
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, {$set: update }, null);
};