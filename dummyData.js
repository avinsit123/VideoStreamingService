console.log("Populating MongoDB with some data yooooo!!");

var async = require('async');
var MovieUser = require('./models/movieUser');

var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://avinsit123:YpeqpQnHXe2x5S1E@cluster0.ovqi8.mongodb.net/sample_project?retryWrites=true" ;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function movieUserCreate(name, age, password){
    movieUserDetail = {
        name : name,
        age : age,
        password: password,
    };

    var movieUserInstance = new MovieUser(movieUserDetail);
    console.log(movieUserInstance);
    movieUserInstance.save(function(err){
        if (err) return console.error(err);
    });
}

movieUserCreate("Avinash", "23", "123itnsit#");
movieUserCreate("Rama", "21", "helloworld");
movieUserCreate("Rahul" , "23", "iamgood");
console.log("ASfa .wf ..");

mongoose.connection.close(); 
// function createMovieUser(cb) {
//     async.series([
//         function(callback) {
//             movieUserCreate("Avinash", "23", "123itnsit#");
//         },
//         function(callback) {
//             movieUserCreate("Rama", "21", "helloworld");
//         },
//         function(callback) {
//             movieUserCreate("Rahul" , "23", "iamgood");
//         },        
//     ],
//     cb);
// }


// async.series([createMovieUser] ,
//     function(err, results) {
//         if (err) {
//             console.log('FINAL ERR: '+err);
//         }
//         else {
//             console.log('Submitted');
//         }
//         // All done, disconnect from database
//         mongoose.connection.close(); 
//     });


