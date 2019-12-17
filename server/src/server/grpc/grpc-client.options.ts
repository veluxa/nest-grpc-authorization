import { ClientOptions, Transport } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { join } from 'path';
import { readFileSync } from 'fs';

const ca = readFileSync(join(__dirname, 'fixtures', 'root.crt'));
const key = readFileSync(join(__dirname, 'fixtures', 'client.key'));
const cert = readFileSync(join(__dirname, 'fixtures', 'client.crt'));

export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'board',
        protoPath: join(__dirname, 'board.proto'),
        credentials: grpc.credentials.createSsl(ca, key, cert),
    },
};
