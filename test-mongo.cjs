const mongoose = require("mongoose");

const uri = process.env.DATABASE_URI;

console.log("Testing MongoDB connection...");

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log("? MongoDB connection SUCCESS");
  return mongoose.disconnect();
})
.then(() => {
  console.log("? Disconnected");
  process.exit(0);
})
.catch((error) => {
  console.log("? MongoDB connection FAILED");
  console.log("Code:", error.code);
  console.log("Message:", error.message);
  process.exit(1);
});
