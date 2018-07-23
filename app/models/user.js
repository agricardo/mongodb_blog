const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    email:{type: String, lowercase: true, trim: true},
    password: String,
    name: {type: String, trim: true},
    emailConfirmed: {type: Boolean, default: false},
    emailConfirmationToken: String,
    resetPaswordToken: String,
    resetPasswordExpires: Number
});
 userSchema.methods.generateHash = function (password){
     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 };

 userSchema.methods.isValidPassword = function (password){
     return bcrypt.compareSync(password, this.password);
 };

 userSchema.method.isEmailConfirmed = function (){
     return this.emailConfirmed;
 };

 module.exports = mongoose.model('User', userSchema);