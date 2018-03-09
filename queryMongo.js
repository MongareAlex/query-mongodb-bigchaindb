
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const urlMongo = 'mongodb://localhost:27017'
const dbName = 'bigchain'

queryMongo()
async function queryMongo( month, year){

	MongoClient.connect(urlMongo, function(err, client) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server")

	  const db = client.db(dbName);

	  const collection = db.collection('assets');
  

  	  // Match any of the search terms: 'word1 word2 word3'
	  collection.find({ $text: { $search: 'coffe chocolate two' } } )
	  .toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs);
	  });

	  // Using AND operator: ' "word1" "word2" '
	  collection.find({ $text: { $search: ' "05/01/2016" "04:00" ' } } )
	  .toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs);
	  });

	  // Search for phrase: '"\"phrase to search\""'
	  collection.find({ $text: { $search: '"\"coffee shop\""' } } )
	  .toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs);
	  });

	  // Exclude assets with value: '"coffee -shop"'
	  collection.find({ $text: { $search: '"coffee -shop"' }})
	  .toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs);
	  });
	 
	  client.close();
	})
}