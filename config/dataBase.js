const mongoose = require("mongoose");
const config = require("./default");

const { DB_URI } = config.MONGO;

const connectDatabase = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex:true
    })
    .then((con) => {
      console.log(`Mongodb connected with HOST ${con.connection.host}`);
    });
};

module.exports = connectDatabase;
