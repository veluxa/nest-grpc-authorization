import { Module } from '@nestjs/common';
import { GRPCController } from './grpc.controller';

@Module({
    controllers: [GRPCController],
})
export class GRPCModule {};