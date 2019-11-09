/* eslint-disable */

const driver = require('bigchaindb-driver')
const bip39 = require('bip39')
const App = require('../src/App.js')

require('dotenv').config()

// const TEST_MNEMONIC = 'TEST_MNEMONIC'
// const TEST_SEED = bip39.mnemonicToSeed(TEST_MNEMONIC).slice(0, 32)
// const TEST_KEYPAIR = new driver.Ed25519Keypair(TEST_SEED)
const TEST_KEYPAIR = (new driver.Ed25519Keypair(bip39.mnemonicToSeed('somemnemonic').slice(0, 32))).publicKey
const TEST_QRASSET = {
  assetData: {
    qr_code: 'FAKE_QR_CODE'
  },
  metaData: {
    intake_date: new Date(),
    batch_id: 'FAKE_BATCH_ID',
    client: 'FAKE_CLINET',
    product_type: 'FAKE_PRODUCT_TYPE',
    weight_kg: 1
  },
}

describe('App', () => {
  const app = new App(
    process.env.API_URL,
    process.env.APP_ID,
    process.env.APP_KEY
  )
  it('Instantiates with environment variables', () => { 
    expect(app).toBeTruthy()
  })
  it('Establishes a connection', (done) => {
    expect(app.connection).toBeInstanceOf(driver.Connection)
    request.get(process.env.API_URL, (err, res) => {
      if(!err && res){
        res.statusCode == 200
        done()
      }
    })
  })
  it('Generates and commits a QRAsset', () => {
    const qrasset = app.generateQRAsset(
      TEST_QRASSET.assetData,
      TEST_QRASSET.metaData,
      TEST_KEYPAIR.publicKey
    )
    expect(qrasset.data).toBeInstanceOf(Object)
  })
})
