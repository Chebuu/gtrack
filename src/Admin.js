const driver = require('bigchaindb-driver');
const User = require('./User');
const util = require('./util');

const ADMIN_SCHEMA = {
  assetData: {
    namespace: String,
  },
  metaData: {
    canLink: String,
  },
}

class Admin extends User {
  constructor(connection, keypair = null) {
    super(connection, keypair);
  }

  async create(namespace, groupid) {
    const assetData = {
      namespace,
    };
    const metaData = {
      canLink: groupid,
    };
    const isValid = util.validateData(assetData, ADMIN_SCHEMA.assetData) && util.validateData(metaData, ADMIN_SCHEMA.metaData);
    if (isValid) {
      const condition = driver.Transaction.makeEd25519Condition(this.publicKey, true);
      const output = driver.Transaction.makeOutput(condition, 1, [this.publicKey]);
      const transaction = driver.Transaction.makeCreateTransaction(assetData, metaData, output, this.publicKey);
      const signedTransaction = driver.Transaction.signedTransaction(transaction, this.privateKey);
      let committedTransaction;
      await this.connection.Transaction.postTransactionCommit(signedTransaction)
        .then((trxn) => {
          committedTransaction = trxn;
        })
        .catch(() => {
          committedTransaction = false;
        });
      return committedTransaction;
    }
    return false;
  }
}

module.exports = Admin;
