/* eslint-disable */
const fs = require('fs');

test('BigchainDB Makefile exists', () => {
  const makeExists = fs.existsSync('./bigchaindb/Makefile');
  expect(makeExists).toBeTruthy();
});