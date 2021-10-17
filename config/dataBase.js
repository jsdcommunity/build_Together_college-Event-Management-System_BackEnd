const mongoose = require("mongoose");

const DB_URI =
  process.env.DB_LOCAL_URI || "mongodb://localhost:27017/Eventogenic";

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
