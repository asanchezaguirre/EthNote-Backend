const mongoose = require('mongoose');
const {Schema} = mongoose

const noteSchema = new Schema({
	_id: Schema.Types.ObjectId,
	location: { type: String, required: true },
	date: { type: String, required: true },
	period: { type: String, required: true },
	project: { type: Schema.Types.ObjectId, ref: 'Project'},
	listOfPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
	listOfText: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
});



module.exports = mongoose.model('Note', noteSchema);

