import * as grpc from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { ServiceClient } from '@grpc/grpc-js/src/make-client';
import { ServiceError } from '@grpc/grpc-js/src';
import { readFileSync } from 'fs';
import { join } from 'path';

// import * as grpc from 'grpc'
// function WorklogService(): ServiceClient {

//     const typeDefs = loadSync(__dirname + '/board.proto')
//     const board: any = grpc.loadPackageDefinition(typeDefs).board

//     return new board.WorklogService('localhost:5000',grpc.credentials.createInsecure())
// }

// const client = WorklogService()

// client.getWorkmateInfos({id:2},(error,response) => {
//     console.log(error,response)
// })

function WorklogServiceJs(): ServiceClient {

    const typeDefs = loadSync(__dirname + '/board.proto')
    const board: any = grpc.loadPackageDefinition(typeDefs).board

    const boardClient = board.WorklogService

    // return new boardClient('localhost:5000', grpc.credentials.createInsecure())

    const ca = readFileSync(join(__dirname, 'fixtures', 'root.crt'));
    const key = readFileSync(join(__dirname, 'fixtures', 'client.key'));
    const cert = readFileSync(join(__dirname, 'fixtures', 'client.crt'));
    return new boardClient('localhost:5000', grpc.credentials.createSsl(ca, key, cert))
}

const clientJs = WorklogServiceJs()

clientJs.getWorkmateInfos({id:2},(error: ServiceError, response: any) => {
    console.log(response)
})

// clientJs.close()