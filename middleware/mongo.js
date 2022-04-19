const mongoose = require("mongoose");
mongoose
  .connect('mongodb+srv://YAYANOOB:1234567898@cluster0.joj6c.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((E) => {
    console.log(E);
  });
const conn = mongoose.connection;


module.exports = conn;
