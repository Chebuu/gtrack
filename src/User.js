// TODO:
// // Should keyseed be cast to a string before using it to generate a keypair?
// // !!! bip39 stipulates that a valid mnemonic is a 12-word phrase
// // // // - This means I cant use bip39.valideMnemonic(), however...
// // // // - I'd rather generate a keypair for a user by using simply a PIN or password.
// // // // - Plus, BigchainDB requires the seed to be a certain length (I guess 32 characters...?)

const driver = require('bigchaindb-driver');
const bip39 = require('bip39');
const util = require('./util');

const USER_SCHEMA = {
  assetData: {
    keypair: Object,
  },
  metaData: {
    event: String,
    date: Date,
    timestamp: Date,
    publicKey: String,
    eventData: Object, // { userType: String, },
  },
};

const generateSeed = (mnemonic) => {
  if (typeof mnemonic === 'string' && mnemonic !== '') {
    const seed = bip39.mnemonicToSeed(mnemonic).slice(0, 32);
    return seed;
  }
  return false;
};

class User {
  constructor(connection, keypair = null) {
    this.connection = connection;
    this.keypair = keypair;
  }

  generateKeypair(mnemonic) {
    if (!this.keypair) {
      const keyseed = generateSeed(mnemonic);
      if (keyseed) {
        this.keypair = new driver.Ed25519Keypair(keyseed);
        return this.keypair;
      }
      return false;
    }
    return this.keypair;
  }

  async create(userType) {
    if (this.publicKey) {
      const metaData = {
        event: 'USER_CREATED',
        date: new Date(),
        timestamp: new Date(Date.now()),
        publicKey: this.publicKey,
        eventData: {
          userType,
        },
      };
      const isValid = util.validateData(metaData, USER_SCHEMA.metaData);
      if (isValid) {
        const condition = driver.Transaction.makeEd25519Condition(this.publicKey, true);
        const output = driver.Transaction.makeOutput(condition);
        output.public_keys = [this.publicKey];
        const transaction = driver.Transaction.makeCreateTransaction(this.keypair, metaData, output, this.publicKey);
        const signedTransaction = driver.Transaction.signTransaction(transaction, this.privateKey);
        let committedTransaction;
        await this.connection.postTransactionCommit(signedTransaction)
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
    return false;
  }

  get publicKey() {
    return this.keypair.publicKey;
  }

  get privateKey() {
    return this.keypair.privateKey;
  }
}

module.exports = User;
