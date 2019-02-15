const mongoose = require('mongoose');
const {Schema} = mongoose

const textSchema = new Schema({
	_id: Schema.Types.ObjectId,
	text: { type: String },
	status: { type: Boolean },
	note: { type: Schema.Types.ObjectId, ref: 'Note' }
});

module.exports = mongoose.model('Text', textSchema);
