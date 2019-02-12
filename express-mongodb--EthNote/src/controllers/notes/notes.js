const mongoose = require('mongoose');
const Note = require('../../models/Note');
const Text = require('../../models/Text');
const Photo = require('../../models/Photo');


const index = (req, res) =>{
	Note
		.find()
		.exec()
		.then(data => {
			res
				.json({
					type:'Getting notes',
					data:data
				})
				.status(200)
			})
			.catch(err => {
				console.log(`caugth error: ${err}`);
				return res.status(500).json(err);
			})
	}

/*
const findBy = (req,res) =>{
		Treatment

		.findById(req.params.treatmentId)
		.then(data => {
			res
				.json({
					type: "Found Treatment by Id",
					data: data
				})
				.status(200)
		})
		.catch(err =>{
			console.log(`caugth error: ${err}`);
			return res.status(500).json(err);
		})
	}
	*/

const createText = (body, day) =>{
	//console.log(body.user);
	const newText = new Text ({
		_id: mongoose.Types.ObjectId(),
		information: body.information,
		status: body.status,
		note: body.note
		
	})

	newText.save()
		return newText._id
}

const createPhoto = (body, day) =>{
	const newPhoto = new Photo ({
		_id: mongoose.Types.ObjectId(),
		description: body.description,
		photo: body.photo,
		note: body.note
		
	})

	newPhoto.save()
		return newPhoto._id
}

const create = (req, res) =>{
		
		const newIds = req.body.listOfTreatments.split(',')
		const newTreatment = new Treatment({  
			_id: mongoose.Types.ObjectId(), 
			description: req.body.description,
			listOfTreatments: req.body.listOfTreatments,
			user: req.body.user,
			listOfAppointments: newIds.map((day) => createAppointment(req.body, day))
		});

		newTreatment
		.save()
		.then(data => {
			res
				.json({
					type:"New Treatment",
					data: data
				})
				.status(200)
		})
		.catch(err => {
			console.log(`caugth error: ${err}`);
			return res.status(500).json({message: 'Post Failed'});
		})
	}




module.exports = {
	index,
	//findBy,
	create
	
}
