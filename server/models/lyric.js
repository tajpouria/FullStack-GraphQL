const mongoose = require('mongoose');

const {
  Type: { ObjectId },
} = mongoose.Schema;

const lyricSchema = new mongoose.Schema({
  song: { type: ObjectId, ref: 'song' },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

lyricSchema.static.likes = function (id) {
  return this.findById(id)
    .then((lyric) => {
      lyric.likes += 1;
      return lyric.save();
    })
    .catch(({ message }) => new Error(message));
};

mongoose.model('Lyric', lyricSchema);
