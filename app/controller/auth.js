var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;



passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: '3a23c5bcbfc27b720a7d',
    clientSecret: '38d4a1627600965575f527cbab234ada32bc99a6',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));

const logout = async (req, res, next, svc) => {
    console.log('logout')
    req.session.destroy();
    res.redirect('/');
}

const github = async (req, res, next, svc) => {
  console.log('github')
  passport.authenticate('github')(req, res, next)
}

const githubCallback = async (req, res, next, svc) => {
  console.log('githubCallback')
   passport.authenticate('github', { failureRedirect: '/login' })(req, res, next)
}

const githubCallbackSuccess = async (req, res, next, svc) => {
  console.log('githubCallbackSuccess')
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
}

// router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res) {
//     req.session.user = {
//       id: req.user.id,
//       username: req.user.displayName || req.user.username,
//       avatar: req.user._json.avatar_url,
//       provider: req.user.provider
//     };
//     res.redirect('/');
//   });



module.exports = {
  logout,
  github,
  githubCallback,
  githubCallbackSuccess
}