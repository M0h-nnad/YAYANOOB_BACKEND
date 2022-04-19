const Talent = require('../models/talents.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createTalent = async (req, res) => {
  const { name, talent, number } = req.body;
  try {
    const newTalent = await new Talent({ name, talent, number })

    await newTalent.save();
    res.status(201).send({ message: 'Created Successfully', sentObject: newTalent })
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: err });
  }
}

const getTalents = async (req, res) => {
  try {
    const talents = await Talent.aggregate([{ $project: { voteNumbers: { $size: "$Votes" }, name: 1, talent: 1, number: 1 } }]);
    res.status(200).send({ message: 'Got Successfully', sentObject: talents })

  } catch (err) {
    console.log(err)


    res.status(400).send({ message: err });

  }
}

const deleteTalent = async (req, res) => {
  const { id } = req.params;
  try {

    const talent = await Talent.deleteOne({ _id: id });
    console.log(talent)
    res.status(200).send({ message: 'Deleted Successfully' })

  } catch (err) {
    console.log(err)

    res.status(400).send({ message: err });

  }
}

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const hasedPass = '$2a$12$d3HYHqaTuZPmD/oV1fEmH.pT6.h4AGL0WXG15Wkc61nWvsRf/z94q';
  try {
    if (username !== 'YAYANOOB') {
      console.log('gee')
      return res.status(400).send({message:"Wrong Username"});
    }
    const isTrue = await bcrypt.compare(password, hasedPass);
    console.log(isTrue)
    if (!isTrue) { return res.status(400).send({message:"Wrong Password"}); }

    const token = jwt.sign({}, 'YAYANOOOOOOOOOOOBOADJS%%%%madeb&*&*&(*&%^#$%^#45ysfandsa!@@_$(!#JAHSASADMXAASKJ', { expiresIn: '1h' });

    res.status(200).send({ token })

  } catch (err) {
    console.log(err)

    res.status(400).send({ message: err });

  }
}

const vote = async (req, res) => {
  const { id } = req.params;
  const { email, type } = req.body;
  let number;
  try {
    // console.log(req.body, id, type)
    if (type === 'up') {
      const updatedObj = await Talent.findOneAndUpdate({ _id: id }, { $addToSet: { Votes: email } }, { new: true })
      number = updatedObj.voteNumbers;
    } else {
      const updatedObj = await Talent.findOneAndUpdate({ _id: id }, { $pull: { Votes: email } }, { new: true })
      number = updatedObj.voteNumbers;
    }
    res.status(200).send({ message: "Voted Successfully", number })
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });

  }
}

module.exports = {
  createTalent,
  deleteTalent,
  getTalents,
  logIn,
  vote
}