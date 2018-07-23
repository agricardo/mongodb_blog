// module.exports = function (app, passport) {
//     // INITIALIZE MY AUTHENTICATION ROUTES
//     require('./authentication')(app, passport);
  
//     // INITIALIZE MY VIEWS ROUTES
//     require('./views')(app);
//   }





module.exports = function(app, passport){
require('./auth')(app, passport, isLoggedIn);

require('./views')(app, isLoggedIn);

}    

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();
    
    res.redirect('/');
}