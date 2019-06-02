const mongoose = require('mongoose');

const {
  Type: { ObjectId },
} = mongoose.Schema;

const LyricSchema = new mongoose.Schema({
  song: { type: ObjectId, ref: 'song' },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

LyricSchema.static.likes = (id) => {
  const Lyric = mongoose.model('Lyric');

  return Lyric.findById(id)
    .then((lyric) => {
      lyric.likes += 1;
      return lyric.save();
    })
    .catch(({ message }) => new Error(message));
};

mongoose.model('Lyric', LyricSchema);
