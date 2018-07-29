// server/bin/www.js

const app = require('../app')
const numCpus = require('os').cpus().length
const cluster = require('cluster')

if(cluster.isMaster) {
  for(let i = 0; i<numCpus; i++) {
    let worker = cluster.fork()
    worker.on('error', () => {
      cluster.fork()
    })
  }
} else {
  app.listen(3000, () => {
    console.log('server is up')
  }); // >1024
}
