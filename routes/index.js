var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://avinsit123:YpeqpQnHXe2x5S1E@cluster0.ovqi8.mongodb.net/sample_project?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertDocument(personDocument) {
  try {
    await client.connect();
    const collection = client.db("sample_project").collection("movieusers");
    const result = await collection.insertOne(personDocument);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}

async function searchForDocument(personDocument) {
  try {
    await client.connect();
    const collection = client.db("sample_project").collection("movieusers");
    console.log(personDocument);
    const result = await collection.findOne( {
      username : personDocument.userID,
      firstpwd : personDocument.pwd,
    });
    console.log(result);
    return result;
  } finally {
    await client.close();
  }
}

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/homepage', function(req, res, next) {
  // If User wants to login
  if ( req.headers.referer == "http://localhost:3000/login" ) {
    const personInfo = searchForDocument(req.body);
    console.log(personInfo);
    if(personInfo != null) {
      res.render('homepage' , {
        userInfo : personInfo,
      });
    } else {
      res.redirect('/login');
    }
  } 
  
  // If User wants to register
  else  {
    console.log(req.body);
    insertDocument(req.body).catch(console.dir);
    res.render('homepage', {
      userInfo : req.body
    });
  }

});

module.exports = router;
