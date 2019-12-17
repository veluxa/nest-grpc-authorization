import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc, Client, GrpcMethod } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { WorkmateInfo, PostId } from './interface/grpc.interface';

interface WorklogService {
    getWorkmateInfos(data: { id: number }): Observable<any>;
}

@Controller()
export class GRPCController implements OnModuleInit {

    @Client(grpcClientOptions)
    private readonly client: ClientGrpc;
    private worklogService: WorklogService;

    onModuleInit() {
        this.worklogService = this.client.getService<WorklogService>('WorklogService');
    }

    @Get()
    execute(): Observable<any> {
        return this.worklogService.getWorkmateInfos({ id: 1 });
    }

    @GrpcMethod('WorklogService', 'GetWorkmateInfos')
    getWorkmateInfos(data: PostId, metadata: any): WorkmateInfo {
        return {
            id: 1,
            name: 'test',
            nickname: '昵称',
            avatar: '',
        };
    }
}
