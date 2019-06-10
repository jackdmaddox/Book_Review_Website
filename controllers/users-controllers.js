const bcrypt = require('bcryptjs');
const User = require('../models/users-model');

exports.signup_get = (req, res) => {
    res.render('template', { 
        locals: {
            title: 'Sign Up Page' ,
            is_logged_in: req.session.is_logged_in
    
        },
        partials: {
            partial: 'partial-signup-form'
        }  
        });
}