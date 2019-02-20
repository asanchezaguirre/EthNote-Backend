const mongoose = require('mongoose');
const Project = require('../../models/Project')
const Note = require('../../models/Note');



const index = (req, res) =>{
	Project
		.find()
		.exec()
		.then(data => {
			res
				.json({
					type:'Getting projects',
					data:data
				})
				.status(200)
			})
			.catch(err => {
				console.log(`caugth error: ${err}`);
				return res.status(500).json(err);
			})
	}

const findBy = (req,res) =>{
		Project

		.findById(req.params.projectId)
		.then(data => {
			res
				.json({
					type: "Found Project by Id",
					data: data
				})
				.status(200)
		})
		.catch(err =>{
			console.log(`caugth error: ${err}`);
			return res.status(500).json(err);
		})
	}


const create = (req, res) =>{
		
		const newProject = new Project({  
			_id: mongoose.Types.ObjectId(), 
			title: req.body.title,
			topic: req.body.topic,
			objective: req.body.objective,
			categories: req.body.categories,
			user: req.body.user,
			
		});

		newProject
		.save()
		.then(data => {
			res
				.json({
					type:"New Project",
					data: data
				})
				.status(200)
		})
		.catch(err => {
			console.log(`caugth error: ${err}`);
			return res.status(500).json({message: 'Post Failed'});
		})
	}

const removeBy = (req, res) =>{
	Project
	.findById(req.params.projectId, function (err, project) {
            if (!err) {
                Note.deleteMany({ project: { $in: [project._id] } }, function (err) { })
                project
                    .remove()
                    .then(() => {
                        res.status(200)
                            .json({
                                message: 'Project was deleted'
                            })
                    })
            }
        }).catch(err => {
            console.log(`caugth err: ${err}`);
            return res.status(500).json({ message: 'You do not have permission' })
        })
}

const updateBy = (req, res) =>{
	Project
		.updateOne({_id:req.params.projectId}, 
			{title: req.body.title,
			topic: req.body.topic,
			objective: req.body.objective,
			categories: req.body.categories,
			})
		.then(data => {
			res
				.json({
					type: "Project Updated",
					data: data
				})
				.status(200)
		})
		.catch(err =>{
			console.log(`caugth error: ${err}`);
			return res.status(500).json(err);
		})
}


const findNotesBy = (req, res) => {
    Note
      .find({ project: req.params.projectId })
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
	create,
	removeBy,
	updateBy,
	findNotesBy,
	
}