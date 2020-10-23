const { MongoClient } = require('mongodb');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?ssl=true&replicaSet=atlas-14jn7z-shard-0&authSource=admin&retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) {
          reject(err);
        }
        console.log('Connected succesfully to mongo');
        resolve(this.client.db(this.dbName));
      });
    });
  }
  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }
}

module.exports = MongoLib;
