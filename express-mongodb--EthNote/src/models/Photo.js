const mongoose = require('mongoose');
const {Schema} = mongoose

const photoSchema = new Schema({
	_id: Schema.Types.ObjectId,
	description: { type: String, required: true },
	photo: { type: String, required: true },
	note: { type: Schema.Types.ObjectId, ref: 'Note', required: true }
});


module.exports = mongoose.model('Photo', photoSchema);

