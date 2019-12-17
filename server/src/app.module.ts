import { Module } from '@nestjs/common';
import { GRPCModule } from './server/grpc/grpc.module';

@Module({
  imports: [GRPCModule],
})
export class AppModule {}
