const mongoose = require('mongoose');
//Requerimos bcrypt
const bcrypt = require('bcrypt');
//Requerimos el jsonwebtoken
const jwt = require('jsonwebtoken');

const User = require('../../models/User')
const Project = require('../../models/Project')




const index = (req, res) =>{
	User
		.find()
		.exec()
		.then(users => {
			res
				.json({
					users,
					total: users.length
				})
				.status(200)
			})
			.catch(err => {
				console.log(`caugth error: ${err}`);
				return res.status(500).json(err);
			})
	}


const create = (req, res) =>{
		const newUser = new User({  
			_id: mongoose.Types.ObjectId(), 
			name: req.body.name,
			email: req.body.email,
			password:req.body.password,
			phoneNumber: req.body.phoneNumber,
			occupation: req.body.occupation
		});

		newUser
		.save()
		.then(data => {
			res
				.json({
					type:"New User",
					data: data
				})
				.status(200)
		})
		.catch(err => {
			console.log(`caugth error: ${err}`);
			return res.status(500).json({message: 'Post Failed'});
		})
	}
	

const findBy = (req,res) =>{
		User

		.findById(req.params.userId)
		.then(users => {
			res
				.json({
					users,
					total: users.length
				})
				.status(200)
		})
		.catch(err =>{
			console.log(`caugth error: ${err}`);
			return res.status(500).json(err);
		})
	}

 const signup = (req, res) => {
      User
        .find({email: req.body.email})
        .exec()
        .then(users => {
          if (users.length < 1){
            //save new user using bcrypt
            bcrypt.hash(req.body.password, 10, (error, hash) => {
              if (error) {
                return res
                .status(500)
                .json({
                  message: error
                })
              }
              //create new user
              const newUser = new User ({
                _id: mongoose.Types.ObjectId(), 
				name: req.body.name,
				email: req.body.email,
				password: hash,
				phoneNumber: req.body.phoneNumber,
				occupation: req.body.occupation
              })
              newUser
                .save()
                .then(saved => {
                  res
                  .status(200)
                  .json({
                    message: 'User created succesfully',
                    data: saved
                  });
                })
            });
          } else {
            res
              .status(422)
              .json({
                message: 'User already exists'
              })
          }
        })
    }

const login = (request, response) => {
	User
		.find({email: request.body.email})
		.exec()
		.then(user =>{
			if (user.length > 0) {
				//comparacion de passwords
				bcrypt.compare(request.body.password, user[0].password, (error, result) =>{
					if (error){
						return response
						.status(401)
						.json({
							message: 'Authentication Failed'
						})
					}
					//se crea token
					if (result) {
						const token = jwt.sign({
							name: user[0].name,
							email: user[0].email,
						}, process.env.JWT_SECRETKEY, {
							expiresIn: '1hr'
						});

						return response
							.status(200)
							.json({
								message:'Authentication Succesfull',
								token
							});
					}
					response
						.status(401)
						.json({
							message: 'Authentication Failed'
						})
					})
			} else {
				response
					.status(422)
					.json({
						message: 'Authentication Failed'
					})
			}
		});

}


/*
const updateBy = (request,response) =>{
	const name = request.body.name;
	const email = request.body.email;
	const password = request.body.password;
	const phoneNumber = request.body.phoneNumber;
	const occupation =request.body.occupation;
		User
		.findOne({_id:request.params.userId})
		.then(function(user){
			//save new user
			bcrypt.compare(password, user.password, (error, result) =>{
				if(result) {
					user.name = name;
					user.email = email;
					user.phoneNumber = phoneNumber;
					user.occupation = occupation;
					user.save()
						.then(saved => {
							response
								.status(201)
								.json({
									message: 'User Updated successfully',
									user: saved
								});
						})
				} else {
					bcrypt.hash(password, 10, (error, hash) =>{
						if (error) {
							return response
							.status(500)
							.json({
								message: error
							});
						}
						user.name = name;
						user.email = email;
						user.phoneNumber = phoneNumber;
						user.occupation = occupation;
						user.password = hash;
						user
							.save()
							.then(saved =>{
								response
								.status(201)
								.json({
									message: 'User Updated successfully',
									user:saved
								});
							})
					});
				}
			});
		})
		.catch(err =>{
			console.log(`caught the error: ${err}`);
			return response.status(404).json({"type": "Not Found"});
		});
	}
*/
const deleteBy = (req, res) => {
    User
        .deleteOne({_id:req.params.userId})
        .then(data => {
            res
            	.status(200)
                .json({
                    message: 'User was deleted',
                    data: data
                 })
        	}) 
           	.catch(err => {
            console.log(`caugth err: ${err}`);
            return res.status(500).json({ message: 'You do not have permission' })
        })
}

const findProjectBy = (req, res) => {
    Project
      .find({ user: req.params.userId })
      .exec()
      .then(data => {
        res
        	.status(200)
        	.json({
	          type: 'Finding the Project',
	          data: data
	        })
      })
      .catch(err => {
        console.log(`caugth err: ${err}`);
        return res.status(500).json(err)
      })
  }

module.exports = {
	index,
	findBy,
	//updateBy,
	deleteBy,
	create,
	login,
	signup,
	findProjectBy,
}
