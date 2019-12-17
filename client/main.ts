import Client from 'grpc-man/lib/Client'

async function main() {

    const client = new Client('127.0.0.1:5000', __dirname + '/board.proto');
    var res = await client.grpc.board.WorklogService.getWorkmateInfos({id:2});
    console.log(res)
}

main()