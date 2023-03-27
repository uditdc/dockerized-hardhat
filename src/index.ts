import fastify from 'fastify'
import axios from 'axios'
import { ethers } from "ethers";

const HARDHAT_URL = 'http://0.0.0.0:8545'

const server = fastify()
const provider = new ethers.providers.JsonRpcProvider('http://0.0.0.0:8545')

server.get('/block-number', async (request, reply) => {
  reply.send(await provider.getBlockNumber())
})

server.get('/rpc', async (request, reply) => {
  reply.send('Method does not exist. Use POST for /rpc to connect with ' + process.env.RPC_URL)
})

server.post('/rpc', async (request, reply) => {
  try {
    const { data } = await axios.post(HARDHAT_URL, request.body);

    reply.send(data);
  } catch (err: any) {
    reply.status(500).send({ error: err.message });
  }
})

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
