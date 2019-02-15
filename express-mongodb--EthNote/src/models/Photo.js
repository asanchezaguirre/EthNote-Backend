const mongoose = require('mongoose');
const {Schema} = mongoose

const photoSchema = new Schema({
	_id: Schema.Types.ObjectId,
	photo: [{ type: String }],
	note: { type: Schema.Types.ObjectId, ref: 'Note' }
});


module.exports = mongoose.model('Photo', photoSchema);

