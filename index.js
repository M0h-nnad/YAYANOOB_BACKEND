const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const talentControler = require('./controls/talent')
const DBConnection = require('./middleware/mongo');
const auth = require('./middleware/auth')
app.use(bodyParser.json());
app.use(cors());

app.get('', talentControler.getTalents);
app.post('/vote/:id',talentControler.vote)
app.post('/login',talentControler.logIn)
app.post('/talent', auth,talentControler.createTalent);
app.delete('/talent/:id', auth,talentControler.deleteTalent);


app.listen(2000)