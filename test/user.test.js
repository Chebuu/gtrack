/* eslint-disable */

const driver = require('bigchaindb-driver')
const User = require('../src/User')

require('dotenv').config()

describe('User', () => {
  let user 
  const connection = new driver.Connection(
    process.env.API_URL,
    {
      app_id: process.env.APP_ID,
      app_key: process.env.APP_KEY
    }
  )
  it('Instantiates a user without keypair', () => {
    user = new User(connection)
    expect(user).toBeInstanceOf(User)
  })

  it('Instantiates a user from keypair', () => {
    const keypair = { privateKey: '<TODO>', publicKey: '<TODO>'}
    const user = new User(connection, keypair)
    expect(user).toBeInstanceOf(User)
  })

  it('Generates keypair from menmonic', () => {
    const keypair = user.generateKeypair('SomeMnemonic')
    expect(keypair).toBeInstanceOf(Object)
    expect(user.keypair).toBeInstanceOf(Object)
    expect(user.keypair).toHaveProperty('publicKey')
    expect(user.keypair).toHaveProperty('privateKey')
  })

  it('Commits a new user', () => {
    user.generateKeypair('SomeMnemonic')
    const trxn = user.create('Some userType')
    expect(trxn).isTruthy()
    expect(user.metData).toBeInstanceOf(Object)
  })

  
})
