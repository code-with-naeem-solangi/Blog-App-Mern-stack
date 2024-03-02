const mongoose = require("mongoose");
// const colors = require("colors");
const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // console.log(
    //   `Mongo connet succesfull ${mongoose.connection.host}`.bgMagenta.white
    // );
  } catch (error) {
    console.log(`Mongo connet error ${error}`.bgRed.white);
  }
};
module.exports = connetDB;
