const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../../models/User')

//@route GET api/users/test
//@desc tests users route
//@access public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));		//Don't need the /api/users because it's defined in server.js

//@route GET api/users/test
//@desc tests users route
//@access public
router.post('/register', (req, res) => {
	User.findOne({email: req.body.email})
	.then(user => {
		if(user){
			return res.status(400).json({email: 'email already exists'});
		}else{
			const avatar = gravatar.url(req.body.email, {
				s: 200,		//these are GRAVATAR specifications
				r: 'pg',
				d: 'mm'
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser.save()
					.then(user => res.json(user))
					.catch(err => console.log(err));
				})
			})
		}
	});
});

//@route GET api/users/login
//@desc Login user / return JWT token
//@access public
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	//Find user by email, use User model
	User.findOne({email})
	.then(user => {
		if(!user){
			return res.status(404).json({email: 'User not found'});
		}
		//check password - hashed, need bcrypt
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if(isMatch){
				res.json({msg: 'Success!'});
			}else{
				res.status(400).json({password: 'Password incorrect'});
			}
		}).catch(err => console.log(err));
	}).catch(err => console.log(err));
});

module.exports = router;