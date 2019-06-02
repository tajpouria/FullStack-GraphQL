const mongoose = require('mongoose');

const Lyric = require('./lyric');

const {
  Types: { ObjectId },
} = mongoose.Schema;

const songSchema = new mongoose.Schema({
  title: { type: String },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  lyrics: [
    {
      type: ObjectId,
      ref: 'Lyric',
    },
  ],
});

songSchema.statics.addLyric = function (id, content) {
  return this.findById(id).then((song) => {
    const lyric = new Lyric({ content, song });
    song.lyrics.push(lyric);
    return Promise.all([lyric.save(), song.save()])
      .then(([consent, song]) => song)
      .catch(({ message }) => new Error(message));
  });
};

songSchema.statics.findLyrics = function (id) {
  return this.findById(id)
    .populate('lyrics')
    .then(({ lyrics }) => lyrics)
    .catch(({ message }) => new Error(message));
};

module.exports = mongoose.model('Song', songSchema);
