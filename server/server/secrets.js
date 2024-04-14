require('dotenv').config();
const secrets = {
    dbUri: process.env.MONGO_URI,
};
  
  const getSecret = (key) => secrets[key];
  
  module.exports = { getSecret };