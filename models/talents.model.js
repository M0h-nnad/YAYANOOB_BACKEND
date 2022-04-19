const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  name: { type: String },
  talent: { type: String },
  number: { type: Number },
  Votes: [String]
})
talentSchema.virtual('voteNumbers').get(function () {
  return this.Votes.length
});
module.exports = mongoose.model('Talent', talentSchema)