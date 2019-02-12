const mongoose = require('mongoose');
const {Schema} = mongoose

const projectSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: { type: String, required: true },
	topic: { type:String, required:true },
	objective: { type:String },
	categories: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Project', projectSchema);

