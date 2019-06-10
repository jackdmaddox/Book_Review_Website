const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  User = require('../models/users-model'),
  UsersControllers = require('../controllers/users-controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Page',
      is_logged_in: req.session.is_logged_in

    },
    partials: {
      partial: 'partial-index'
    }
  });
});


router.get('/login', (req, res) => {
  res.render('template', { 
  locals: {
      title: 'Login Page' ,
      is_logged_in: req.session.is_logged_in

      },
  partials: {
      partial: 'partial-login-form'
  }  
  });
});

router.get('/signup', UsersControllers.signup_get);


router.post('/login', (req, res) => {
  const { email, password} = req.body;

  const userInstance = new User(null, null, null, email, password);

  userInstance.login().then(response => {
  req.session.is_logged_in = response.isValid;
  if (!!response.isValid) {
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.user_id;
      res.redirect('/');
  } else {
      res.sendStatus(401);
  }
  });
});


router.post('/signup', (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password } = req.body;

//Salt and hash our password!
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt); 

//Create a new user instance with the sign up information
  const userInstance = new User(null, first_name, last_name, email, hash);
  userInstance.save().then(response => {
  console.log("response is", response);
  req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.user_id;
  res.redirect('/');
});
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})




module.exports = router;