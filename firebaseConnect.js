const admin = require("firebase-admin");

const serviceAccount = require("./secret_admin_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = { admin };