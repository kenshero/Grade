var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	subject : String,
	grade : String,
	credit : String
});