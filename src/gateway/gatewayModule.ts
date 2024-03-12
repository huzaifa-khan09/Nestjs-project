import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './authGateway/authGateway'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GATEWAY',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8002, 
        },
      },
    ]),
  ],
  controllers: [AuthGatewayController],
})
export class gatewayModule {}