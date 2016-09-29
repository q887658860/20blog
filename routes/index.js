var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
	User = require('../models/user.js');
/* GET home page. */


module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', {title: 'Homepage'});
	});
	app.get('/reg', function (req, res) {
		res.render('reg', {title: 'Register'});
	});
	app.post('/reg', function(req, res){
		var name = req.body.name,
			password = req.body.password,
			password_re = req.body['password-repeat'];
		//check if this two password are the same
		if (password != password_re) {
			req.flash('error', 'passwords do not match ');
			return res.redirect('/reg');//return to reg page
		}
		//generate md5 of password
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: name,
			password: password,
			email: req.body.email
		});
		//check if the username existed in database
		User.get(newUser.name, function(err, user){
			if(err) {
				req.flash('error', err);
				return res.redirect('/');
			}
			if(user) {
				req.flash('error', 'Username already existed!');
				return res.redirect('/reg');//return to reg page
			}
			//pass check, add new user to database 
			newUser.save(function(err, user){
				if(err) {
					req.flash('error', err);
					return res.redirect('/reg');
				}
				req.session.user = newUser; //store all new user's information into session
				req.flash('success', 'succeed to register');
				res.redirect('/');//return to homepage
			});
		});

	});
	app.get('/login', function (req, res) {
		res.render('login', {title: 'Login'});
	});
	app.post('/login', function(req, res){
		
	});
	app.get('/post', function (req, res) {
		res.render('post', {title: 'Post'});
	});
	app.post('/post', function(req, res){

	});
	app.get('/logout', function(req, res){
		
	});


};