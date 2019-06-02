const mongoose = require('mongoose');

const {
  Type: { ObjectId },
} = mongoose.Schema;

const songSchema = new mongoose.Schema({
  title: { type: String },
  user: {
    type: ObjectId,
    ref: 'user',
  },
  lyric: {
    type: ObjectId,
    ref: 'lyric',
  },
});

songSchema.static.addLyric = function (id, content) {
  const Lyric = mongoose.model('Lyric');

  return this.findById(id).then((song) => {
    const lyric = new Lyric({ content, song });
    song.lyrics.push(lyric);
    Promise.all([lyric.save(), song.save()])
      .then(([lyric, song]) => song)
      .catch(({ message }) => new Error(message));
  });
};

songSchema.static.findLyrics = function (id) {
  this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics)
    .catch(({ message }) => new Error(message));
};

mongoose.model('Song', songSchema);
