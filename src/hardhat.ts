const { execSync } = require('child_process')

execSync('npx hardhat node --network hardhat', { stdio: 'inherit' })