var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieUserSchema = Schema(
    {
        name : { type: String, required: true,  maxLength : 100} , 
        age : { type: String, required: true},
        password : { type: String, required: true,  maxLength : 50}, 
    }
);

module.exports = mongoose.model('movieUser', movieUserSchema);


