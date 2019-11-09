/* eslint-disable */

const driver = require('bigchaindb-driver')
const User = require('../src/Admin')

require('dotenv').config()

describe('Admin', () => {
  const connection = new driver.Connection(
    process.env.API_KEY,
    {
      app_id: process.env.API_ID,
      app_key: process.env.API_KEY
    }
  )
  
  it('is instantiable', () => {
    const admin = new Admin(connection)
    expect(admin).toBeInstanceOf(Admin)
  })
  
  it('generates keypair from menmonic', () => {
    const keypair = admin.generateKeypair('SomeMnemonic')
    expect(keypair).toBeInstanceOf(Object)
    expect(admin.keypair).toBeInstanceOf(Object)
    expect(admin.keypair).toHaveProperty('publicKey')
    expect(admin.keypair).toHaveProperty('privateKey')
  })

  it('creates a new admin', () => {
    const admin = new Admin(connection)
    admin.generateKeypair('SomeMnemonic')
    const trxn = admin.create('Some namespace', 'Some groupid')
    expect(trxn).isTruthy()
    expect(admin.metData).toBeInstanceOf(Object)
  })

  it('instantiates an admin from keypair', () => {
    const keypair = { privateKey: '<TODO>', publicKey: '<TODO>'}
    const admin = new Admin(connection, keypair)
    expect(admin.metData).toBeInstanceOf(Object)
  })
})
