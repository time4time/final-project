// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const passport = require('passport');
// const User = require('../../models/User.js');

// passport.use(new GoogleStrategy({

//   clientID: '568055538958-n41ie0t18iv0vv6v65gvatcrchmqa9e5.apps.googleusercontent.com',
//   clientSecret: '7fTuZqUvPQegS8tv63fin7v6',
//   callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
  

// },
// (token, refreshToken, profile, done) => {
//     process.nextTick(() => {
//         User.findOne({ 'google.id' : profile.id }, (err, user) => {
//           debugger
//           if (err)
//             return done(err);
//           debugger
//           if (user) {
//                 return done(null, user);
//           } else {
//             var newUser = new User();

//             newUser.google.id    = profile.id;
//             newUser.google.token = token;
//             newUser.google.name  = profile.displayName;
//             newUser.google.email = profile.emails[0].value; // pull the first email

//             newUser.save((err) => {
//               debugger
//               if (err) throw err;
//               return done(null, newUser);
//             });

        
//           }
//       });
//   });
// }));

// passport.use(User.createStrategy());

// require('./init.js')(User, passport);

// module.exports = passport;
