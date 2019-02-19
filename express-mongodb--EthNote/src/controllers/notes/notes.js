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
	

const createText = (body, status) =>{
	console.log(body, status)
	const newText = new Text ({
		_id: mongoose.Types.ObjectId(),
		text: body,
		status: status,
		note: body.note,
		
	})

	newText.save()
		return newText._id
}

const createPhoto = (body, photo) =>{
	const newPhoto = new Photo ({
		_id: mongoose.Types.ObjectId(),
		photo,
		note: body._id
		
	})

	newPhoto.save()

		return newPhoto._id
}


const create = (req, res) =>{
		
		//const newTextCreate = req.body.listOfText.split(',')
		const newPhotoCreate= req.body.listOfPhotos.split(',')
		const newText= [createText(req.body.listOfText1, 0), createText(req.body.listOfText2, 1)];
		//console.log(newText)

		const newNote = new Note({  
			_id: mongoose.Types.ObjectId(), 
			location: req.body.location,
			date: req.body.date,
			period: req.body.period,
			project: req.body.project,
			titleProject: req.body.titleProject,
			listOfPhotos: newPhotoCreate.map((photo) => createPhoto(req.body, photo)),
			listOfText: newText
		});
		

 console.log(newNote)

		newNote

		.save()
		.then(data => {
			res
				.json({
					type:"New Note",
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
