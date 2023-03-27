import fastify from 'fastify'
import { ethers } from "ethers";

const server = fastify()
const provider = new ethers.providers.JsonRpcProvider('http://0.0.0.0:8545')

server.get('/block-number', async (request, reply) => {
  reply.send(await provider.getBlockNumber())
})

server.get('/rpc-url', async (request, reply) => {
  reply.send(process.env.RPC_URL)
})

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
