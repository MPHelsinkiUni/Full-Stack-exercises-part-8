const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  published: {
    type: Number,
    required: true,
    minlength: 5
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  genres: {
    type: [String],
    required: true,
    validate: {
        validator: (genres) => genres.length > 0,
        message: "Genre missing"
    }
  },
})

module.exports = mongoose.model('Book', schema)