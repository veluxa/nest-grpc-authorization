import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as grpc from 'grpc';
import { join } from 'path';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ca = readFileSync(join(__dirname, 'server', 'grpc', 'fixtures', 'root.crt'));
  const key = readFileSync(join(__dirname, 'server', 'grpc', 'fixtures', 'server.key'));
  const cert = readFileSync(join(__dirname, 'server', 'grpc', 'fixtures', 'server.crt'));

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'board',
      protoPath: join(__dirname, 'server', 'grpc', 'board.proto'),
      credentials: grpc.ServerCredentials.createSsl(ca, [
        {
          private_key: key,
          cert_chain: cert,
        },
      ], true),
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000).then(
    () => {
      console.log('GRPC server listening on port 3000!')
    })
}

bootstrap();
