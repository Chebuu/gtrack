/* eslint-disable import/newline-after-import */
const driver = require('bigchaindb-driver');

const QRAsset = require('./QRAsset');

const generateOutput = (publicKey) => [
  driver.Transaction.makeOutput(
    driver.Transaction.makeEd25519Condition(
      publicKey,
    ),
  ),
  publicKey,
];

class App {
  constructor(API_URL, APP_ID, APP_KEY) {
    this.connection = new driver.Connection(
      API_URL,
      {
        app_id: APP_ID,
        app_key: APP_KEY,
      },
    );
  }

  static generateQRAsset(assetData, metaData, publicKey) {
    const output = generateOutput(publicKey);
    return new QRAsset(assetData, metaData, output);
  }

  postCreateTransaction(privateKey, qrAsset) {
    const transactionData = qrAsset.data;
    const transaction = driver.Transaction.makeCreateTransaction(...transactionData);
    const signedTransaction = driver.Transaction.signTransaction(transaction, privateKey);
    return this.connection.postTransactionCommit(signedTransaction);
  }

  postTransferTransaction(fromPrivateKey, toPublicKey) {
    return [fromPrivateKey, toPublicKey, this.connection];
  }
}

module.exports = App;
