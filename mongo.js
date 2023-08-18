const mongoose = require("mongoose");
const env = require("./env");

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.mongo.cosmos.azure.com:${env.cosmosPort}/?ssl=true`;

function connect() {
  console.log("connecting");
  return mongoose.connect(mongoUri, {
    auth: { username: env.dbName, password: env.key },
    retryWrites: false,
  });
}

module.exports = {
  connect,
  mongoose,
};
