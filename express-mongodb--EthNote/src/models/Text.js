const mongoose = require('mongoose');
const {Schema} = mongoose

const textSchema = new Schema({
	_id: Schema.Types.ObjectId,
	information: { type: String, required: true },
	status: { type: Boolean, required: true },
	note: { type: Schema.Types.ObjectId, ref: 'Note', required: true }
});


module.exports = mongoose.model('Text', textSchema);
